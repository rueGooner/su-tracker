import { ApiProperty } from '@nestjs/swagger';
import { Note } from '@prisma/client';

export class NoteEntity implements Note {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  serviceUserId: number;

  @ApiProperty({ required: false })
  supportWorkerId: number;
}
