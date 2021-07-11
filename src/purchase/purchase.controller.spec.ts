import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './../db/entities/note.entity';
import { Offre } from './../db/entities/offre.entity';
import { Course } from './../db/entities/course.entity';
import { HttpModule } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';

jest.setTimeout(30000);

const data = {
  clientId: '37f3dab9-34e2-4d6c-ad8c-2806e1ce4f18',
  fromAddress: {
    latitude: 48.870377,
    longitude: 2.370615,
  },
  nbPassengers: 1,
  paymentMethod: 'ON_BOARD',
  toAddress: {
    latitude: 48.882719,
    longitude: 2.322451,
  },
  vehicleType: 'PRIME',
  tripType: 'RESERVATION',
  distance: 4609,
  duration: 1366,
  willBePaidInCash: true,
  startDate: '2021-07-30 12:00',
};

const resultData = {
  fromAddress: {
    address: '139 Avenue Parmentier',
    zipCode: '75010',
    city: 'Paris',
    country: 'France',
    latitude: 48.87034,
    longitude: 2.37061,
  },
  toAddress: {
    address: '48 Boulevard des Batignolles',
    zipCode: '75017',
    city: 'Paris',
    country: 'France',
    latitude: 48.88272,
    longitude: 2.32245,
  },
  startDate: '2021-07-30 12:00',
  estimatedPrice: 16,
};

describe('PurchaseService', () => {
  let controller: PurchaseController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        PurchaseService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Note),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Offre),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
      controllers: [PurchaseController],
    }).compile();

    controller = module.get(PurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return resultData', async () => {
    const res = await controller.purchase(data);
    expect(res).toEqual(resultData);
  });
  it('should return Error(bad startDate)', async () => {
    data.startDate = '2021-01-01 01:01';

    try {
      await controller.purchase(data);
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });
});
