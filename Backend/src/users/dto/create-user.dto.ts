import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

const USER_ROLE = ['admin', 'user'] as const;
const USER_STATUS = ['active', 'suspended'] as const;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsIn(USER_ROLE)
  role!: (typeof USER_ROLE)[number];

  @IsIn(USER_STATUS)
  status!: (typeof USER_STATUS)[number];

  @IsString()
  @IsNotEmpty()
  phone!: string;
}
