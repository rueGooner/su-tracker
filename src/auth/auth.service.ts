import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  register({ email, password }: AuthDto) {
    const newSupportWorker = this.prisma.supportWorker.create({
      data: {
        email,
        password: '',
      },
    });
    return 'This action adds a new auth';
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
}
