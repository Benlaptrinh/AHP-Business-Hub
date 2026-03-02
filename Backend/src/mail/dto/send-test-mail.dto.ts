import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendTestMailDto {
  @IsEmail()
  to: string;

  @IsOptional()
  @IsString()
  @MaxLength(140)
  subject?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  message?: string;
}
