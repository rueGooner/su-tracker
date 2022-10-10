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
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceUserService } from './service-user.service';
import { ServiceUserDto, UpdateServiceUserDto } from './dto/service-user.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceUser } from '@prisma/client';
import { ServiceUserEntity } from './entities/service-user.entity';

@Controller('service-user')
@ApiTags('Service Users')
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: ServiceUserEntity })
  async create(
    @Body() createServiceUserDto: ServiceUserDto,
  ): Promise<ServiceUser> {
    return this.serviceUserService.create(createServiceUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ServiceUserEntity, isArray: true })
  async findAll(): Promise<ServiceUser[]> {
    return this.serviceUserService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ServiceUserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceUser> {
    return this.serviceUserService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ServiceUserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceUserDto: UpdateServiceUserDto,
  ): Promise<ServiceUser> {
    return this.serviceUserService.update(+id, updateServiceUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 400,
    description: 'Invalid Service User ID Supplied.',
  })
  @ApiResponse({
    status: 404,
    description: 'Service User not found.',
  })
  async remove(@Param('id') id: number): Promise<string> {
    return this.serviceUserService.remove(id);
  }
}
