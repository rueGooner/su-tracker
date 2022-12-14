import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { capitaliseCharacter } from '../utils/string-functions';
import { PrismaService } from '../prisma/prisma.service';
import { NotesDto, UpdateNotesDto } from './dto/notes.dto';
import { Note, UpdatedNote } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: NotesDto): Promise<Note> {
    try {
      const newNote = await this.prisma.note.create({
        data: {
          title: createNoteDto.title,
          content: createNoteDto.content,
          serviceUserId: createNoteDto.serviceUserId,
          supportWorkerId: createNoteDto.supportWorkerId,
        },
      });
      return newNote;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            capitaliseCharacter(`${error.meta.target} is already in use`, 0),
          );
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.note.findMany();
  }

  async findByServiceUser(id: number): Promise<Note[] | string> {
    const notes = await this.prisma.note.findMany({
      where: {
        serviceUserId: id,
      },
    });

    return notes.length === 0
      ? `There are no Notes for Service User: #${id}`
      : notes;
  }

  async findOne(id: number): Promise<Note> {
    return await this.prisma.note.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateNoteDto: UpdateNotesDto,
  ): Promise<UpdatedNote> {
    console.log(updateNoteDto);

    return await this.prisma.updatedNote.create({
      data: { ...updateNoteDto, noteId: id },
    });
  }
}
