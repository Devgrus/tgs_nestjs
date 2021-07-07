import { Body, Controller, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './OfferDto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  getOffers(@Body() offerData: OfferDto) {
    return this.offerService.getOffers(offerData);
  }
}
