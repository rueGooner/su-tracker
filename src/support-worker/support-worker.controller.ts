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
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupportWorker } from '@prisma/client';
import {
  SupportWorkerDto,
  UpdateSupportWorkerDto,
} from './dto/support-worker.dto';
import { SupportWorkerEntity } from './entities/support-worker.entity';
import { SupportWorkerService } from './support-worker.service';

@Controller('support-worker')
@ApiTags('Support Workers')
export class SupportWorkerController {
  constructor(private readonly supportWorkerService: SupportWorkerService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: SupportWorkerEntity,
    description: 'Returns the created Support Worker.',
  })
  @ApiForbiddenResponse({
    description: 'Throws a forbidden exception. EG. Duplicate Email.',
  })
  create(
    @Body() createSupportWorkerDto: SupportWorkerDto,
  ): Promise<SupportWorker> {
    return this.supportWorkerService.create(createSupportWorkerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SupportWorkerEntity,
    isArray: true,
    description: 'Retrieve the full list of Support Workers.',
  })
  findAll(): Promise<SupportWorker[]> {
    return this.supportWorkerService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SupportWorkerEntity,
    description: 'Retrieve a single Support Worker by ID.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Throws an error if no Support Worker is found by ID.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SupportWorker> {
    try {
      return await this.supportWorkerService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(`No Support Worker match for ID: ${id}`);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SupportWorkerEntity,
    description: 'Returns an updated Support Worker.',
  })
  @ApiNotFoundResponse({
    description: 'Throws if no Support Worker is found.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupportWorkerDto: UpdateSupportWorkerDto,
  ): Promise<SupportWorker> {
    return await this.supportWorkerService.update(+id, updateSupportWorkerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Returns confirmation of the deleted Support Worker.',
  })
  @ApiResponse({
    status: 400,
    description: 'Throws when an invalid ID is supplied.',
  })
  @ApiResponse({
    status: 404,
    description: 'Throws when a Support Worker is not found.',
  })
  async remove(
    @Param('id') id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    return await this.supportWorkerService.remove(+id);
  }
}
