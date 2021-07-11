import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';

jest.setTimeout(30000);

const data = {
  fromLatitude: 48.870377,
  fromLongitude: 2.370615,
  nbPassengers: 1,
  toLatitude: 48.882719,
  toLongitude: 2.322451,
  startDate: '2099-07-01 01:01',
};
const data2 = {
  fromLatitude: 48.870377,
  fromLongitude: 2.370615,
  nbPassengers: 1,
  toLatitude: 48.882719,
  toLongitude: 2.322451,
  startDate: '2099-12-12 12:12',
};

describe('OfferService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OfferService],
    }).compile();

    service = module.get<OfferService>(OfferService);
  });

  it('should return data (startDate value type 1)', async () => {
    const res = await service.getOffers(data);
    expect(res[0].estimation.distance === 4609).toBe(true);
  });
  it('should return data (startDate value type 2)', async () => {
    const res = await service.getOffers(data2);
    expect(res[0].estimation.distance === 4609).toBe(true);
  });
  it('Should return startDate error (30min)', async () => {
    const data3 = {
      fromLatitude: 48.870377,
      fromLongitude: 2.370615,
      nbPassengers: 1,
      toLatitude: 48.882719,
      toLongitude: 2.322451,
      startDate: '2021',
    };
    try {
      await service.getOffers(data3);
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });
});
