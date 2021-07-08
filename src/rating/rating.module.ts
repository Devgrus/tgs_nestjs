import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { OffreRepository } from 'src/db/repositories/offre.repository';
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
