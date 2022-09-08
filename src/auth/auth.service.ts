import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login(reateAuthDto: CreateAuthDto) {
    return `This action returns all auth`;
  }

  logout(reateAuthDto: CreateAuthDto) {
    return 'Logout';
  }

  refresh(reateAuthDto: CreateAuthDto) {
    return 'Refresh Token';
  }
}
