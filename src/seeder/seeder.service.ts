import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';

@Injectable()
export class SeederService {
  constructor(private prisma: PrismaService) {}
  createFakeServiceUsers(): string {
    return 'Create Fake Service Users';
  }

  create(createSeederDto: CreateSeederDto) {
    return 'This action adds a new seeder';
  }

  findAll() {
    return `This action returns all seeder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seeder`;
  }

  update(id: number, updateSeederDto: UpdateSeederDto) {
    return `This action updates a #${id} seeder`;
  }

  remove(id: number) {
    return `This action removes a #${id} seeder`;
  }
}
