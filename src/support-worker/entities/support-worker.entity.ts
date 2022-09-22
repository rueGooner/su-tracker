import { ApiProperty } from '@nestjs/swagger';
import { SupportWorker } from '@prisma/client';

export class SupportWorkerEntity implements SupportWorker {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  hashedToken: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  skills: string[];

  @ApiProperty({ required: false })
  notes: string[];
}
