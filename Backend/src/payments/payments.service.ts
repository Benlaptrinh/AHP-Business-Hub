import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import type { AuthUser } from '../common/roles';
import { MailService } from '../mail/mail.service';
import type { CapturePaypalOrderDto } from './dto/capture-paypal-order.dto';
import type { CreatePaymentDto } from './dto/create-payment.dto';
import type { CreatePaypalOrderDto } from './dto/create-paypal-order.dto';
import type { UpdatePaymentDto } from './dto/update-payment.dto';

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  customer: string;
  ownerEmail: string;
  method: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  updatedAt: string;
}

interface PaypalOrderDraft {
  invoiceId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
}

@Injectable()
export class PaymentsService {
  private payments: PaymentRecord[] = [
    {
      id: 'pay_1',
      invoiceId: 'INV-2026-0102',
      customer: 'Gia đình Anh Long',
      ownerEmail: 'user@gmail.com',
      method: 'Bank Transfer',
      amount: 320000000,
      dueDate: '2026-03-02',
      status: 'paid',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'pay_2',
      invoiceId: 'INV-2026-0115',
      customer: 'Công ty Minh Thành',
      ownerEmail: 'manager@anhongphat.vn',
      method: 'Credit Card',
      amount: 86500000,
      dueDate: '2026-02-28',
      status: 'pending',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'pay_3',
      invoiceId: 'INV-2026-0119',
      customer: 'Gia đình Chị Lan',
      ownerEmail: 'user@gmail.com',
      method: 'Bank Transfer',
      amount: 120000000,
      dueDate: '2026-02-20',
      status: 'overdue',
      updatedAt: new Date().toISOString(),
    },
  ];

  private readonly paypalDraftByOrderId = new Map<string, PaypalOrderDraft>();

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  findAll(): PaymentRecord[] {
    return this.payments;
  }

  findMyPayments(email: string): PaymentRecord[] {
    return this.payments.filter((item) => item.ownerEmail.toLowerCase() === email.toLowerCase());
  }

  findOne(id: string): PaymentRecord {
    const payment = this.payments.find((item) => item.id === id);
    if (!payment) {
      throw new NotFoundException(`Payment ${id} not found`);
    }
    return payment;
  }

  getStats() {
    const totalAmount = this.payments.reduce((acc, item) => acc + item.amount, 0);
    const paid = this.payments
      .filter((item) => item.status === 'paid')
      .reduce((acc, item) => acc + item.amount, 0);
    const pending = this.payments
      .filter((item) => item.status === 'pending')
      .reduce((acc, item) => acc + item.amount, 0);
    const overdue = this.payments
      .filter((item) => item.status === 'overdue')
      .reduce((acc, item) => acc + item.amount, 0);

    return {
      totalInvoices: this.payments.length,
      totalAmount,
      paid,
      pending,
      overdue,
    };
  }

  create(dto: CreatePaymentDto): PaymentRecord {
    const created: PaymentRecord = {
      id: randomUUID(),
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.payments = [created, ...this.payments];
    return created;
  }

  update(id: string, dto: UpdatePaymentDto): PaymentRecord {
    const existing = this.findOne(id);
    const updated: PaymentRecord = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    this.payments = this.payments.map((item) => (item.id === id ? updated : item));
    return updated;
  }

  remove(id: string): { deleted: boolean } {
    this.findOne(id);
    this.payments = this.payments.filter((item) => item.id !== id);
    return { deleted: true };
  }

  async createPaypalOrder(dto: CreatePaypalOrderDto, authUser?: AuthUser) {
    const amount = Number(dto.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('amount must be greater than 0');
    }

    const currency = (dto.currency ?? 'USD').toUpperCase();
    const accessToken = await this.getPaypalAccessToken();
    const apiBaseUrl = this.getPaypalBaseUrl();

    const invoiceId = dto.invoiceId?.trim() || `PAYPAL-${Date.now()}`;

    const response = await fetch(`${apiBaseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            invoice_id: invoiceId,
            description: dto.description ?? 'AHP payment order',
          },
        ],
      }),
    });

    const payload = (await response.json()) as {
      id?: string;
      status?: string;
      message?: string;
      details?: Array<{ description?: string }>;
      links?: Array<{ rel?: string; href?: string }>;
    };

    if (!response.ok || !payload.id) {
      const detailMessage = payload.details?.[0]?.description;
      throw new BadRequestException(detailMessage ?? payload.message ?? 'Failed to create PayPal order');
    }

    this.paypalDraftByOrderId.set(payload.id, {
      invoiceId,
      customerName: dto.customerName ?? authUser?.name ?? 'Khách hàng',
      customerEmail: dto.customerEmail ?? authUser?.email ?? '',
      amount,
      currency,
    });

    const approveUrl = payload.links?.find((item) => item.rel === 'approve')?.href ?? null;

    return {
      orderId: payload.id,
      status: payload.status,
      approveUrl,
    };
  }

  async capturePaypalOrder(dto: CapturePaypalOrderDto, authUser?: AuthUser) {
    const accessToken = await this.getPaypalAccessToken();
    const apiBaseUrl = this.getPaypalBaseUrl();

    const response = await fetch(`${apiBaseUrl}/v2/checkout/orders/${dto.orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const payload = (await response.json()) as {
      id?: string;
      status?: string;
      message?: string;
      details?: Array<{ description?: string }>;
      payer?: {
        email_address?: string;
        name?: { given_name?: string; surname?: string };
      };
      purchase_units?: Array<{
        invoice_id?: string;
        amount?: { value?: string; currency_code?: string };
        payments?: {
          captures?: Array<{
            id?: string;
            status?: string;
            amount?: { value?: string; currency_code?: string };
            create_time?: string;
            update_time?: string;
          }>;
        };
      }>;
    };

    if (!response.ok) {
      const detailMessage = payload.details?.[0]?.description;
      throw new BadRequestException(detailMessage ?? payload.message ?? 'Failed to capture PayPal order');
    }

    const draft = this.paypalDraftByOrderId.get(dto.orderId);
    const unit = payload.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];

    const invoiceId =
      dto.invoiceId?.trim() || draft?.invoiceId || unit?.invoice_id || `PAYPAL-${dto.orderId}`;
    const currency = capture?.amount?.currency_code || unit?.amount?.currency_code || draft?.currency || 'USD';
    const amount = Number(capture?.amount?.value || unit?.amount?.value || draft?.amount || 0);

    const payerName = [payload.payer?.name?.given_name, payload.payer?.name?.surname]
      .filter(Boolean)
      .join(' ')
      .trim();

    const ownerEmail =
      dto.customerEmail?.trim() ||
      draft?.customerEmail ||
      payload.payer?.email_address ||
      authUser?.email ||
      'unknown@ahp.local';

    const customer = dto.customerName?.trim() || draft?.customerName || payerName || 'Khách hàng';

    const captureStatus = capture?.status ?? payload.status ?? 'COMPLETED';
    const paymentStatus: PaymentStatus = captureStatus === 'COMPLETED' ? 'paid' : 'pending';

    const existingPayment = this.payments.find((item) => item.invoiceId === invoiceId);
    let payment: PaymentRecord;

    if (!existingPayment) {
      payment = {
        id: randomUUID(),
        invoiceId,
        customer,
        ownerEmail,
        method: 'PayPal',
        amount,
        dueDate: new Date().toISOString().slice(0, 10),
        status: paymentStatus,
        updatedAt: new Date().toISOString(),
      };
      this.payments = [payment, ...this.payments];
    } else {
      payment = {
        ...existingPayment,
        customer,
        ownerEmail,
        method: 'PayPal',
        amount,
        status: paymentStatus,
        updatedAt: new Date().toISOString(),
      };
      this.payments = this.payments.map((item) => (item.id === payment.id ? payment : item));
    }

    if (paymentStatus === 'paid' && ownerEmail) {
      await this.mailService.sendPaymentReceipt({
        to: ownerEmail,
        customerName: customer,
        invoiceId,
        amount,
        currency,
        paymentMethod: 'PayPal',
        paidAt: capture?.update_time ?? capture?.create_time ?? new Date().toISOString(),
      });
    }

    this.paypalDraftByOrderId.delete(dto.orderId);

    return {
      orderId: dto.orderId,
      paypalStatus: payload.status,
      captureId: capture?.id,
      payment,
    };
  }

  private getPaypalBaseUrl() {
    const mode = (this.configService.get<string>('PAYPAL_MODE') ?? 'sandbox').toLowerCase();
    return mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
  }

  private async getPaypalAccessToken() {
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new BadRequestException('PayPal is not configured. Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(`${this.getPaypalBaseUrl()}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const payload = (await response.json()) as { access_token?: string; error_description?: string };

    if (!response.ok || !payload.access_token) {
      throw new BadRequestException(payload.error_description ?? 'Failed to get PayPal access token');
    }

    return payload.access_token;
  }
}
