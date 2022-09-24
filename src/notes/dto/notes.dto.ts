import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

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
  @IsNotEmpty()
  @IsNumber()
  serviceUserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  supportWorkerId: number;
}

export class UpdateNotesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  content: string;
}
