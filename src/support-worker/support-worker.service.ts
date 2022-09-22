import { ForbiddenException, Injectable } from '@nestjs/common';
import { SupportWorker } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { capitaliseCharacter } from '../utils/string-functions';
import {
  SupportWorkerDto,
  UpdateSupportWorkerDto,
} from './dto/support-worker.dto';

@Injectable()
export class SupportWorkerService {
  constructor(private prisma: PrismaService) {}

  async create(
    createSupportWorkerDto: SupportWorkerDto,
  ): Promise<SupportWorker> {
    const hash = await argon.hash(createSupportWorkerDto.password);
    const newSupportWorker = await this.prisma.supportWorker
      .create({
        data: {
          ...createSupportWorkerDto,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              capitaliseCharacter(`${error.meta.target} is already in use`, 0),
            );
          }
        }
        throw error;
      });

    return newSupportWorker;
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

  async update(
    id: number,
    updateSupportWorkerDto: UpdateSupportWorkerDto,
  ): Promise<SupportWorker> {
    try {
      return await this.prisma.supportWorker.update({
        where: { id },
        data: updateSupportWorkerDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException(
            capitaliseCharacter(`Support Worker: ${id} does not exist.`, 0),
          );
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.supportWorker.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException(
            capitaliseCharacter(`Support Worker: ${id} does not exist.`, 0),
          );
        }
      }
      throw error;
    }
  }
}
