import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterAuthDto, LoginAuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { Tokens } from './types/token.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt.type';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SupportWorker } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(supportWorker: RegisterAuthDto): Promise<Tokens> {
    const hash = await argon.hash(supportWorker.password);
    const newSupportWorker = await this.prisma.supportWorker
      .create({
        data: {
          ...supportWorker,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Incorrect Credentials');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(newSupportWorker.id, newSupportWorker);

    await this.updateRefreshToken(newSupportWorker.id, tokens.refresh_token);

    return tokens;
  }

  async login(supportWorker: LoginAuthDto) {
    const foundSupportWorker = await this.prisma.supportWorker.findUnique({
      where: {
        email: supportWorker.email,
      },
    });

    if (!supportWorker)
      throw new ForbiddenException('Incorrect Email Provided');

    const passwordMatches = await argon.verify(
      foundSupportWorker.password,
      supportWorker.password,
    );

    if (!passwordMatches)
      throw new ForbiddenException('Incorrect Password provided.');

    const tokens = await this.getTokens(
      foundSupportWorker.id,
      foundSupportWorker,
    );

    await this.updateRefreshToken(foundSupportWorker.id, tokens.refresh_token);

    return tokens;
  }

  async logout(id: number): Promise<boolean> {
    await this.prisma.supportWorker.updateMany({
      where: {
        id: id,
        hashedToken: {
          not: null,
        },
      },
      data: {
        hashedToken: null,
      },
    });

    return true;
  }

  async refreshTokens(id: number, token: string): Promise<Tokens> {
    const supportWorker = await this.prisma.supportWorker.findUnique({
      where: {
        id,
      },
    });

    if (!supportWorker || !supportWorker.hashedToken)
      throw new ForbiddenException('In correct credentials provided');

    const tokensMatch = await argon.verify(supportWorker.hashedToken, token);
    if (!tokensMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(supportWorker.id, supportWorker);
    await this.updateRefreshToken(supportWorker.id, tokens.refresh_token);

    return tokens;
  }

  async hashPassword(password: string): Promise<string> {
    return await argon.hash(password);
  }

  async getTokens(
    id: number,
    { email, name, surname }: SupportWorker,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email,
      name,
      surname,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN'),
        expiresIn: '10m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN'),
        expiresIn: '1d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(id: number, token: string): Promise<void> {
    const hash = await argon.hash(token);

    await this.prisma.supportWorker.update({
      where: {
        id,
      },
      data: {
        hashedToken: hash,
      },
    });
  }
}
