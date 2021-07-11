import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './../db/entities/course.entity';
import { Note } from './../db/entities/note.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

jest.setTimeout(30000);

describe('RatingService', () => {
  let service: RatingService;
  let controller: RatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              fromAddress:
                '{"address":"139 Avenue Parmentier","zipCode":"75010","city":"Paris","country":"France","latitude":48.87034,"longitude":2.37061}',
              toAddress:
                '{"address":"48 Boulevard des Batignolles","zipCode":"75017","city":"Paris","country":"France","latitude":48.88272,"longitude":2.32245}',
              userId: '37f3dab9-34e2-4d6c-ad8c-2806e1ce4f18',
              startDate: '2021-07-09 09:50',
              note: { id: 1, rating: 4 },
            }),
          },
        },
        {
          provide: getRepositoryToken(Note),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1, rating: 4 }),
            save: jest.fn(),
          },
        },
      ],
      controllers: [RatingController],
    }).compile();

    service = module.get<RatingService>(RatingService);
    controller = module.get(RatingController);
  });

  const data = {
    purchaseId: 1,
    rating: 4,
  };
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return data', async () => {
    expect(await controller.rating(data)).toStrictEqual(data);
  });
});
