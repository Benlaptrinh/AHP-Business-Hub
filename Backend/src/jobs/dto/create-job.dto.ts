import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

const JOB_STATUS = ['open', 'paused', 'closed'] as const;

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  department!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  level!: string;

  @IsInt()
  @Min(0)
  applicants!: number;

  @IsIn(JOB_STATUS)
  status!: (typeof JOB_STATUS)[number];
}
