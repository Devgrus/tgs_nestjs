import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from './offer/offer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RatingModule } from './rating/rating.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [OfferModule, PurchaseModule, RatingModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
