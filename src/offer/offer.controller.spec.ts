import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

const data = {
  fromLatitude: 48.870377,
  fromLongitude: 2.370615,
  nbPassengers: 1,
  toLatitude: 48.882719,
  toLongitude: 2.322451,
  startDate: '2099-07-01 01:01',
};

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OfferService],
      controllers: [OfferController],
    }).compile();

    controller = module.get(OfferController);
  });

  it('should return data (startDate value type 1)', async () => {
    const res = await controller.getOffers(data);
    expect(res[0].estimation.distance === 4609).toBe(true);
  });
});
