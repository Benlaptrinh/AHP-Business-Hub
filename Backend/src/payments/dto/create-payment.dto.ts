import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

const PAYMENT_STATUS = ['paid', 'pending', 'overdue'] as const;

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  invoiceId!: string;

  @IsString()
  @IsNotEmpty()
  customer!: string;

  @IsString()
  @IsNotEmpty()
  ownerEmail!: string;

  @IsString()
  @IsNotEmpty()
  method!: string;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsString()
  @IsNotEmpty()
  dueDate!: string;

  @IsIn(PAYMENT_STATUS)
  status!: (typeof PAYMENT_STATUS)[number];
}
