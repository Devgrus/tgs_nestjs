import { Body, Controller, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { OfferResponseDto } from './dto/offerResponse.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @ApiCreatedResponse({ description: 'offer created' })
  getOffers(@Body() offerData: OfferDto): Promise<OfferResponseDto> {
    return this.offerService.getOffers(offerData);
  }
}
