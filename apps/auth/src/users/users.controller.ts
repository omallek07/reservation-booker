import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user-dto';
import { UsersService } from 'apps/auth/src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
