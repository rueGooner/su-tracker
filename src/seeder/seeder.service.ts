import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceUsers, supportWorkers } from './data/data';
import * as argon from 'argon2';
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

  async createFakeSupportWorkers(): Promise<{
    count: number;
  }> {
    const fakeStaff = await Promise.all(
      supportWorkers.map(async (a) => {
        return {
          ...a,
          password: await argon.hash('password'),
        };
      }),
    );

    return this.prisma.supportWorker.createMany({
      data: fakeStaff,
      skipDuplicates: true,
    });
  }
}
