import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { NotesDto, UpdateNotesDto } from './dto/notes.dto';
import { NoteEntity } from './entities/note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
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
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNotesDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Returns confirmation of the deleted Note.',
  })
  @ApiResponse({
    status: 400,
    description: 'Throws when an invalid ID is supplied.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Throws when a Note is not found.',
  })
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
