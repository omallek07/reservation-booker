import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user-dto';
import { UsersRepository } from 'apps/auth/src/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
