import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './../db/entities/course.entity';
import { HistoryService } from './history.service';

jest.setTimeout(30000);

const mockCourseValue = {
  id: 1,
  fromAddress:
    '{"address":"139 Avenue Parmentier","zipCode":"75010","city":"Paris","country":"France","latitude":48.87034,"longitude":2.37061}',
  toAddress:
    '{"address":"48 Boulevard des Batignolles","zipCode":"75017","city":"Paris","country":"France","latitude":48.88272,"longitude":2.32245}',
  userId: '37f3dab9-34e2-4d6c-ad8c-2806e1ce4f18',
  startDate: '2021-07-09 09:50',
  note: { id: 1, rating: 4 },
  offre: {
    id: 1,
    distance: 4609,
    duration: 1366,
    tripType: 'RESERVATION',
    vehicleType: 'PRIME',
    price: 12,
  },
};

const data = {
  purchaseId: 1,
  userId: '37f3dab9-34e2-4d6c-ad8c-2806e1ce4f18',
  distance: 4609,
  duration: 1366,
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
  tripType: 'RESERVATION',
  vehicle: 'PRIME',
  price: 12,
  rating: 4,
  startDate: '2021-07-09 09:50',
};

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockCourseValue),
          },
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should return data', async () => {
    expect(await service.getHistory({ purchaseId: '1' })).toStrictEqual(data);
  });

  let service2: HistoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service2 = module.get<HistoryService>(HistoryService);
  });

  it('should return data', async () => {
    try {
      await service2.getHistory({ purchaseId: '2000' });
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });
});
