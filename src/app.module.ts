import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from './offer/offer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RatingModule } from './rating/rating.module';
import { HistoryModule } from './history/history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbKey } from './../API';

@Module({
  imports: [
    OfferModule,
    PurchaseModule,
    RatingModule,
    HistoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: dbKey,
      database: 'tgs_nesjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
