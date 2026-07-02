import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user-dto';
import { UsersRepository } from 'apps/auth/src/users/users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credentials not valid');
    }
    return user;
  }
}
