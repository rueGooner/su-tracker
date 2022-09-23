import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ServiceUserDto } from '../../service-user/dto/service-user.dto';
import { SupportWorkerDto } from '../../support-worker/dto/support-worker.dto';

export class NotesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  content: string;

  @ApiProperty()
  ServiceUser: ServiceUserDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  serviceUserId: number;

  @ApiProperty()
  SupportWorker: SupportWorkerDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  supportWorkerId: number;
}

export class UpdateNotesDto extends NotesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  content: string;
}
