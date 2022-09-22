import { Injectable } from '@nestjs/common';
import { SupportWorker } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SupportWorkerDto,
  UpdateSupportWorkerDto,
} from './dto/support-worker.dto';

@Injectable()
export class SupportWorkerService {
  constructor(private prisma: PrismaService) {}

  create(createSupportWorkerDto: SupportWorkerDto) {
    return 'This action adds a new supportWorker';
  }

  async findAll(): Promise<SupportWorker[]> {
    return await this.prisma.supportWorker.findMany();
  }

  async findOne(id: number): Promise<SupportWorker> {
    return await this.prisma.supportWorker.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateSupportWorkerDto: UpdateSupportWorkerDto) {
    return `This action updates a #${id} supportWorker`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportWorker`;
  }
}
