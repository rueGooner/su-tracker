import { ApiProperty } from '@nestjs/swagger';
import { ServiceUser } from '@prisma/client';

export class ServiceUserEntity implements ServiceUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  movedIn: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  conditions: string[];

  @ApiProperty({ required: false })
  notes: string[];

  @ApiProperty()
  roomNumber: number;
}
