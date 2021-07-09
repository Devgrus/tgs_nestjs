import { Test, TestingModule } from '@nestjs/testing';
import { CourseRepository } from '../db/repositories/course.repository';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

const mockCourseRepository = () => ({
  findOne: jest.fn(),
});

describe('HistoryController', () => {
  let historyController: HistoryController;
  // let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        { provide: CourseRepository, useFactory: mockCourseRepository },
      ],
      controllers: [HistoryController],
    }).compile();

    historyController = module.get<HistoryController>(HistoryController);
    // historyService = module.get(HistoryService);
  });

  it('should be defined', async () => {
    const data = {
      purchaseId: 1,
    };
    expect(historyController.getHistory(data)).resolves;
  });
});
