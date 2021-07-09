import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../db/repositories/course.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { OffreRepository } from '../db/repositories/offre.repository';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

const mockCourseRepository = () => ({
  save: jest.fn(),
});
const mockNoteRepository = () => ({
  save: jest.fn(),
});
const mockOffreRepository = () => ({
  save: jest.fn(),
});

describe('PurchaseController', () => {
  let purchaseController: PurchaseController;
  // let purchaseService: PurchaseService;
  // let courseRepository: CourseRepository;
  // let offreRepository: OffreRepository;
  // let noteRepository: NoteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        TypeOrmModule.forFeature([
          CourseRepository,
          NoteRepository,
          OffreRepository,
        ]),
      ],
      providers: [
        PurchaseService,
        { provide: CourseRepository, useFactory: mockCourseRepository },
        { provide: NoteRepository, useFactory: mockNoteRepository },
        { provide: OffreRepository, useFactory: mockOffreRepository },
      ],
      controllers: [PurchaseController],
    }).compile();

    purchaseController = module.get(PurchaseController);
    // purchaseService = module.get(PurchaseService);
    // courseRepository = module.get(CourseRepository);
    // noteRepository = module.get(NoteRepository);
    // offreRepository = module.get(OffreRepository);
  });

  describe('purchase', () => {
    it('should be defined', () => {
      expect(purchaseController).toBeDefined();
    });
  });
});
