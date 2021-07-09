import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

describe('OfferController', () => {
  let offerController: OfferController;
  // let offerService: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OfferService],
      controllers: [OfferController],
    }).compile();

    offerController = module.get(OfferController);
  });

  describe('getOffer', () => {
    it('throw error (startDate error)', () => {
      const data = {
        fromLatitude: 48.870377,
        fromLongitude: 2.370615,
        nbPassengers: 1,
        toLatitude: 48.882719,
        startDate: '2021-07-08 23:06',
        toLongitude: 2.322451,
      };
      expect(offerController.getOffers(data)).rejects.toThrow();
    });
    it('getOffer resolve', () => {
      const data = {
        fromLatitude: 48.870377,
        fromLongitude: 2.370615,
        nbPassengers: 1,
        toLatitude: 48.882719,
        toLongitude: 2.322451,
      };
      expect(offerController.getOffers(data)).resolves;
    });
  });
});
