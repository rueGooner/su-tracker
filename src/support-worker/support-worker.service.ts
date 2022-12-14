import { ForbiddenException, Injectable } from '@nestjs/common';
import { SupportWorker } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { capitaliseCharacter } from '../utils/string-functions';
import {
  SupportWorkerDto,
  UpdateSupportWorkerDto,
} from './dto/support-worker.dto';
import { SupportWorkerResponse } from './entities/support-worker.types';

@Injectable()
export class SupportWorkerService {
  constructor(private prisma: PrismaService) {}

  async create(
    createSupportWorkerDto: SupportWorkerDto,
  ): Promise<SupportWorker> {
    const hash = await argon.hash(createSupportWorkerDto.password);
    return this.prisma.supportWorker
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
  }

  async findAll(): Promise<SupportWorkerResponse> {
    return this.prisma.supportWorker.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
    });
  }

  async findOne(id: number): Promise<SupportWorker> {
    return this.prisma.supportWorker.findUnique({
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

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.supportWorker.delete({
        where: { id },
      });
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
