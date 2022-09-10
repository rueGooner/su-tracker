import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/ispublic.decorator';
import { CurrentUserId, CurrentUser } from './decorators/userid.decorator';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards/token.guard';
import { Tokens } from './types/token.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginAuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUserId() id: number): Promise<boolean> {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @CurrentUserId() id: number,
    @CurrentUser('refreshToken') token: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(id, token);
  }
}
