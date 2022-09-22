import { Injectable } from '@nestjs/common';
import { CreateSupportWorkerDto } from './dto/create-support-worker.dto';
import { UpdateSupportWorkerDto } from './dto/update-support-worker.dto';

@Injectable()
export class SupportWorkerService {
  create(createSupportWorkerDto: CreateSupportWorkerDto) {
    return 'This action adds a new supportWorker';
  }

  findAll() {
    return `This action returns all supportWorker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supportWorker`;
  }

  update(id: number, updateSupportWorkerDto: UpdateSupportWorkerDto) {
    return `This action updates a #${id} supportWorker`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportWorker`;
  }
}
