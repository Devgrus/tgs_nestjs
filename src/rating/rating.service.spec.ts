import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './../db/entities/course.entity';
import { Note } from './../db/entities/note.entity';
import { RatingService } from './rating.service';

const mockCourseValue = {
  id: 1,
  fromAddress:
    '{"address":"139 Avenue Parmentier","zipCode":"75010","city":"Paris","country":"France","latitude":48.87034,"longitude":2.37061}',
  toAddress:
    '{"address":"48 Boulevard des Batignolles","zipCode":"75017","city":"Paris","country":"France","latitude":48.88272,"longitude":2.32245}',
  userId: '37f3dab9-34e2-4d6c-ad8c-2806e1ce4f18',
  startDate: '2021-07-09 09:50',
  note: { id: 1, rating: 4 },
};
const mockNoteValue = { id: 1, rating: 4 };
describe('RatingService', () => {
  let service: RatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockCourseValue),
          },
        },
        {
          provide: getRepositoryToken(Note),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockNoteValue),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);
  });

  describe('rating', () => {
    const data = {
      purchaseId: 1,
      rating: 4,
    };
    it('should return data', async () => {
      expect(await service.rating(data)).toStrictEqual(data);
    });
    it('should return error (wrong rating value)', async () => {
      data.rating = 999;
      try {
        await service.rating(data);
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });
  });

  // Case: wrong purchaseId
  let service2: RatingService;
  beforeEach(async () => {
    const module2: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(Note),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockNoteValue),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service2 = module2.get<RatingService>(RatingService);
  });
  describe('rating(purchaseId error)', () => {
    const data = {
      purchaseId: 1,
      rating: 4,
    };
    it('should return error (wrong purchaseId value)', async () => {
      try {
        await service2.rating(data);
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });
  });
});
