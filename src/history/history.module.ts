import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { OffreRepository } from 'src/db/repositories/offre.repository';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OffreRepository,
      CourseRepository,
      NoteRepository,
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
