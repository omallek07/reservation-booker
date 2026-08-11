import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  get stripeSecretKey(): string {
    return this.configService.get<string>('STRIPE_SECRET_KEY')!;
  }

  private readonly stripe = new Stripe(this.stripeSecretKey, {
    apiVersion: '2026-07-29.dahlia',
  });

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'],
    });

    return paymentIntent;
  }
}
