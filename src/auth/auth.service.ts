import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(supportWorker: AuthDto): Promise<Tokens> {
    const hash = await this.hashPassword(supportWorker.password);
    const newSupportWorker = this.prisma.supportWorker.create({
      data: {
        ...supportWorker,
        password: hash,
      },
    });
    // console.log(newSupportWorker);
    // return 'This action adds a new auth';
  }

  login(reateAuthDto: AuthDto) {
    return `This action returns all auth`;
  }

  logout(reateAuthDto: AuthDto) {
    return 'Logout';
  }

  refresh(reateAuthDto: AuthDto) {
    return 'Refresh Token';
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
