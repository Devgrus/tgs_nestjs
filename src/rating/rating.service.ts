import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { RatingDto } from './ratingDto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  async rating(ratingData: RatingDto) {
    try {
      const courseInfo = await this.courseRepository.findOne({
        where: { id: ratingData.courseId },
        relations: ['note'],
      });
      const newRating = await this.noteRepository.findOne({
        where: { id: courseInfo.note.id },
      });
      newRating.rating = ratingData.rating;
      await this.noteRepository.save(newRating);
      const result = `Success: change rating of course id: ${ratingData.courseId}`;
      return JSON.stringify(result);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
