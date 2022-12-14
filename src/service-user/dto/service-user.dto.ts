import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ServiceUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  moveIn: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  conditions: string[];
}

export class UpdateServiceUserDto extends ServiceUserDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  moveIn: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  conditions: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uid: string;
}
