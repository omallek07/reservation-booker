import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'apps/auth/src/current-user.decorator';
import { LocalAuthGuard } from 'apps/auth/src/guards/local-auth.guard';
import { UserDocument } from 'apps/auth/src/users/models/user.schema';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
