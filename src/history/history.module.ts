import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../db/repositories/course.repository';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
