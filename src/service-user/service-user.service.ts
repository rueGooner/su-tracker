import { Injectable } from '@nestjs/common';
import { ServiceUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceUserDto } from './dto/service-user.dto';

@Injectable()
export class ServiceUserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ServiceUserDto): Promise<ServiceUser> {
    return await this.prisma.serviceUser.create({
      data: dto,
    });
  }

  async findAll(): Promise<ServiceUser[]> {
    return this.prisma.serviceUser.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceUser`;
  }

  update(id: number, updateServiceUserDto: ServiceUserDto) {
    return `This action updates a #${id} serviceUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceUser`;
  }
}
