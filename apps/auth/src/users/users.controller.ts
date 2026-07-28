import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'apps/auth/src/current-user.decorator';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user-dto';
import { UserDocument } from 'apps/auth/src/users/models/user.schema';
import { UsersService } from 'apps/auth/src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
