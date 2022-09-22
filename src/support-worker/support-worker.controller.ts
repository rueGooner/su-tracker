import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportWorkerService } from './support-worker.service';
import { CreateSupportWorkerDto } from './dto/create-support-worker.dto';
import { UpdateSupportWorkerDto } from './dto/update-support-worker.dto';

@Controller('support-worker')
export class SupportWorkerController {
  constructor(private readonly supportWorkerService: SupportWorkerService) {}

  @Post()
  create(@Body() createSupportWorkerDto: CreateSupportWorkerDto) {
    return this.supportWorkerService.create(createSupportWorkerDto);
  }

  @Get()
  findAll() {
    return this.supportWorkerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportWorkerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupportWorkerDto: UpdateSupportWorkerDto) {
    return this.supportWorkerService.update(+id, updateSupportWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportWorkerService.remove(+id);
  }
}
