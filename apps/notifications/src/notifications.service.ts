import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from 'apps/notifications/src/dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail({ email }: NotifyEmailDto) {
    console.log('notifyEmail', email);
  }
}
