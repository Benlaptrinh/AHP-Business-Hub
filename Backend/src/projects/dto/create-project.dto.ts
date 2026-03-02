import { IsIn, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

const PROJECT_STATUS = ['active', 'pending', 'closed'] as const;

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progress!: number;

  @IsIn(PROJECT_STATUS)
  status!: (typeof PROJECT_STATUS)[number];

  @IsNumber()
  @Min(0)
  budget!: number;
}
