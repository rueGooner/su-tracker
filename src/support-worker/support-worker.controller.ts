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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  findOne(@Param('id') id: string) {
    return this.supportWorkerService.findOne(+id);
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
