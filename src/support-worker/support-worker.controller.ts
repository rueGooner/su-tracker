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
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @Post()
  create(@Body() createSupportWorkerDto: SupportWorkerDto) {
    return this.supportWorkerService.create(createSupportWorkerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SupportWorkerEntity, isArray: true })
  findAll() {
    return this.supportWorkerService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SupportWorkerEntity })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found Error' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.supportWorkerService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(`No Support Worker match for ID: ${id}`);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupportWorkerDto: UpdateSupportWorkerDto,
  ) {
    return this.supportWorkerService.update(+id, updateSupportWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportWorkerService.remove(+id);
  }
}
