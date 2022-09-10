import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('seeder')
@ApiTags('Seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('service-users')
  createFakeServiceUsers() {
    return this.seederService.createFakeServiceUsers();
  }

  @Post('support-workers')
  createFakeSupportWorkers() {
    return this.seederService.createFakeSupportWorkers();
  }
}
