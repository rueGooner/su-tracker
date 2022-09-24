import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatedNote } from '@prisma/client';
import { NotesDto, UpdateNotesDto } from './dto/notes.dto';
import { NoteEntity } from './entities/note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
@ApiTags('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: NoteEntity,
    description: 'Creates a new Note on a Service User.',
  })
  async create(@Body() createNoteDto: NotesDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: NoteEntity,
    isArray: true,
    description: 'Retrieve all the notes',
  })
  async findAll() {
    return await this.notesService.findAll();
  }

  @Get('service-user/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: NoteEntity,
    isArray: true,
    description: 'Retrieve all notes for a specific Service User.',
  })
  async findByServiceUser(@Param('id') id: string) {
    return await this.notesService.findByServiceUser(+id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: NoteEntity,
    description: 'Retrieve a single Note by ID',
  })
  @ApiNotFoundResponse({
    description: 'Throws an error if no Note is found by ID',
  })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: NoteEntity,
    description: 'Returns the updated Note.',
  })
  @ApiNotFoundResponse({
    description: 'Throws an error if no Note is found by ID.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNotesDto,
  ): Promise<UpdatedNote> {
    return await this.notesService.update(+id, updateNoteDto);
  }
}
