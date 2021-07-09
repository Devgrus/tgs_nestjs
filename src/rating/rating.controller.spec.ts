import { Test, TestingModule } from '@nestjs/testing';
import { CourseRepository } from '../db/repositories/course.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

const mockCourseRepository = () => ({
  findOne: jest.fn(),
});
const mockNoteRepository = () => ({
  findOne: jest.fn(),
});

describe('RatingController', () => {
  // let ratingService: RatingService;
  let ratingController: RatingController;
  // let courseRepository: CourseRepository;
  // let noteRepository: NoteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        { provide: CourseRepository, useFactory: mockCourseRepository },
        {
          provide: NoteRepository,
          useFactory: mockNoteRepository,
        },
      ],
      controllers: [RatingController],
    }).compile();

    // ratingService = module.get<RatingService>(RatingService);
    // courseRepository = module.get(CourseRepository);
    // noteRepository = module.get(NoteRepository);
    ratingController = module.get(RatingController);
  });

  describe('rating', () => {
    // it('return something plz', async () => {
    //   const data = {
    //     purchaseId: 1,
    //     rating: 3,
    //   };
    //   const result = await ratingController.rating(data);
    //   expect(result).toBe(data);
    //   // expect(result).toBe('something');
    // });
    it('return error (purchaseId)', async () => {
      const failData = {
        purchaseId: 999,
        rating: 1,
      };
      try {
        await ratingController.rating(failData);
      } catch (e) {
        expect(e.message).toBe('PurchaseId Not Exist');
      }
    });
    it('return error (purchaseId)', async () => {
      const failData = {
        purchaseId: 1,
        rating: 44,
      };
      try {
        await ratingController.rating(failData);
      } catch (e) {
        expect(e.message).toBe('Acceptable rating values are 1,2,3,4,5');
      }
    });
  });
});
