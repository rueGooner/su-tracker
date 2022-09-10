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
import { ServiceUserService } from './service-user.service';
import { ServiceUserDto } from './dto/service-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceUser } from '@prisma/client';

@Controller('service-user')
@ApiTags('Service Users')
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createServiceUserDto: ServiceUserDto,
  ): Promise<ServiceUser> {
    return await this.serviceUserService.create(createServiceUserDto);
  }

  @Get()
  findAll() {
    return this.serviceUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceUserDto: ServiceUserDto,
  ) {
    return this.serviceUserService.update(+id, updateServiceUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceUserService.remove(+id);
  }
}
