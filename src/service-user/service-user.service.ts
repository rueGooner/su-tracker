import { Injectable } from '@nestjs/common';
import { CreateServiceUserDto } from './dto/create-service-user.dto';
import { UpdateServiceUserDto } from './dto/update-service-user.dto';

@Injectable()
export class ServiceUserService {
  create(createServiceUserDto: CreateServiceUserDto) {
    return 'This action adds a new serviceUser';
  }

  findAll() {
    return `This action returns all serviceUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceUser`;
  }

  update(id: number, updateServiceUserDto: UpdateServiceUserDto) {
    return `This action updates a #${id} serviceUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceUser`;
  }
}
