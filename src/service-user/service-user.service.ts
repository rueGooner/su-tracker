import { Injectable } from '@nestjs/common';
import { ServiceUser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceUserDto, UpdateServiceUserDto } from './dto/service-user.dto';

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

  async findOne(id: number): Promise<ServiceUser> {
    return await this.prisma.serviceUser.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateServiceUserDto: UpdateServiceUserDto,
  ): Promise<ServiceUser> {
    return await this.prisma.serviceUser.update({
      where: { id },
      data: updateServiceUserDto,
    });
  }

  async remove(id: number): Promise<string> {
    const deletedServiceUser = await this.prisma.serviceUser.delete({
      where: { id },
    });
    return `#${deletedServiceUser.id}: ${deletedServiceUser.name} ${deletedServiceUser.surname} has been successfully removed.`;
  }
}
