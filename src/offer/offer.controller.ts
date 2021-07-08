import { Body, Controller, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { OfferResponseDto } from './dto/offerResponse.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  getOffers(@Body() offerData: OfferDto): Promise<OfferResponseDto> {
    return this.offerService.getOffers(offerData);
  }
}
