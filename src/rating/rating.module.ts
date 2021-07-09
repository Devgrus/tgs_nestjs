import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../db/repositories/course.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { OffreRepository } from '../db/repositories/offre.repository';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OffreRepository,
      CourseRepository,
      NoteRepository,
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
