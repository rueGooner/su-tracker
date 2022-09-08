import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceUsers, supportWorkers } from './data/data';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';

@Injectable()
export class SeederService {
  constructor(private prisma: PrismaService) {}

  createFakeServiceUsers(): Promise<{
    count: number;
  }> {
    return this.prisma.serviceUser.createMany({
      data: serviceUsers,
      skipDuplicates: true,
    });
  }

  createFakeSupportWorkers(): Promise<{
    count: number;
  }> {
    return this.prisma.supportWorker.createMany({
      data: supportWorkers,
      skipDuplicates: true,
    });
  }
}
