import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from 'apps/notifications/src/dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() payload: NotifyEmailDto) {
    await this.notificationsService.notifyEmail(payload);
  }
}
