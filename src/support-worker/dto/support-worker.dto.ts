import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SupportWorkerDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  skills: string[];
}

export class UpdateSupportWorkerDto extends SupportWorkerDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  skills: string[];
}
