import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CapturePaypalOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  invoiceId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  customerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  customerEmail?: string;
}
