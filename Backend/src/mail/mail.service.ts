import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface PaymentReceiptInput {
  to: string;
  customerName: string;
  invoiceId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paidAt: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendMail(input: SendMailInput) {
    const enabled = (this.configService.get<string>('MAIL_ENABLED') ?? 'true').toLowerCase() !== 'false';
    if (!enabled) {
      return { sent: false, reason: 'MAIL_ENABLED=false' };
    }

    const host = this.configService.get<string>('MAIL_HOST');
    const port = Number(this.configService.get<string>('MAIL_PORT') ?? 587);
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASS');
    const from = this.configService.get<string>('MAIL_FROM') ?? user;
    const secure = (this.configService.get<string>('MAIL_SECURE') ?? 'false').toLowerCase() === 'true';

    if (!host || !user || !pass || !from) {
      this.logger.warn('SMTP is not fully configured. Skip sending email.');
      return { sent: false, reason: 'SMTP_NOT_CONFIGURED' };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return { sent: true };
  }

  async sendPaymentReceipt(input: PaymentReceiptInput) {
    const formattedAmount = `${input.amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${input.currency}`;

    const subject = `Payment receipt - ${input.invoiceId}`;

    const html = `
      <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
        <h2 style="margin:0 0 12px">AHP Payment Receipt</h2>
        <p>Hi ${input.customerName},</p>
        <p>We have received your payment successfully.</p>
        <ul>
          <li><strong>Invoice:</strong> ${input.invoiceId}</li>
          <li><strong>Amount:</strong> ${formattedAmount}</li>
          <li><strong>Method:</strong> ${input.paymentMethod}</li>
          <li><strong>Paid at:</strong> ${input.paidAt}</li>
        </ul>
        <p>Thank you for choosing AHP.</p>
      </div>
    `;

    return this.sendMail({
      to: input.to,
      subject,
      html,
    });
  }
}
