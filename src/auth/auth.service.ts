import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/token.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt.type';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(supportWorker: AuthDto): Promise<Tokens> {
    const hash = await this.hashPassword(supportWorker.password);
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

    const tokens = await this.getTokens(
      newSupportWorker.id,
      newSupportWorker.email,
    );

    await this.updateRefreshToken(newSupportWorker.id, tokens.refresh_token);

    return tokens;
  }

  async login(supportWorker: AuthDto) {
    const foundSupportWorker = await this.prisma.supportWorker.findUnique({
      where: {
        email: supportWorker.email,
      },
    });

    if (!supportWorker)
      throw new ForbiddenException('Incorrect Email Provided');

    const passwordMatches = await bcrypt.compare(
      supportWorker.password,
      foundSupportWorker.password,
    );

    if (!passwordMatches)
      throw new ForbiddenException('Incorrect Password provided.');

    const tokens = await this.getTokens(
      foundSupportWorker.id,
      foundSupportWorker.email,
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

    const tokensMatch = await bcrypt.compare(supportWorker.hashedToken, token);
    if (!tokensMatch) throw new ForbiddenException('Passwords do not match');

    const tokens = await this.getTokens(supportWorker.id, supportWorker.email);
    await this.updateRefreshToken(supportWorker.id, tokens.refresh_token);

    return tokens;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async getTokens(id: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN'),
        expiresIn: '1m',
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
    const hash = await this.hashPassword(token);

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
