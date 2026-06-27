import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserDocument } from 'apps/auth/src/users/models/user.schema';
import { UsersRepository } from 'apps/auth/src/users/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserDocument },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
