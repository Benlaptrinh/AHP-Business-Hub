import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import type { AuthUser } from '../common/roles';
import { CurrentUser } from './decorators/current-user.decorator';
import { DevLoginDto } from './dto/dev-login.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  async startGoogleLogin(@Query('next') nextPath: string | undefined, @Res() response: Response) {
    const googleLoginUrl = await this.authService.buildGoogleOAuthLoginUrl(nextPath);
    return response.redirect(googleLoginUrl);
  }

  @Get('google/callback')
  async handleGoogleCallback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Query('error') error: string | undefined,
    @Res() response: Response,
  ) {
    const redirectUrl = await this.authService.handleGoogleOAuthCallback({
      code,
      state,
      error,
    });
    return response.redirect(redirectUrl);
  }

  @Post('google')
  loginWithGoogle(@Body() dto: GoogleLoginDto) {
    return this.authService.loginWithGoogle(dto);
  }

  @Post('dev-login')
  loginForDevelopment(@Body() dto: DevLoginDto) {
    return this.authService.devLogin(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: AuthUser | undefined) {
    return { user };
  }
}
