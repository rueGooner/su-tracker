import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUserId } from './decorators/userid.decorator';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/token.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUserId() id: number): Promise<boolean> {
    return this.authService.logout(id);
  }

  @Post('refresh')
  refresh(@Body() dto: AuthDto) {
    return this.authService.refresh(dto);
  }
}
