import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DevLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
