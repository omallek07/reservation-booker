import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from 'apps/payments/src/dto/payments-create-charge.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  get stripeSecretKey(): string {
    return this.configService.get<string>('STRIPE_SECRET_KEY')!;
  }

  private readonly stripe = new Stripe(this.stripeSecretKey, {
    apiVersion: '2026-07-29.dahlia',
  });

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      // Use stripe test card
      payment_method: 'pm_card_visa',
    });

    this.notificationsService.emit('notify_email', {
      email,
    });

    return paymentIntent;
  }
}
