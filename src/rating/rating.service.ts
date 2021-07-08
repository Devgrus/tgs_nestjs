import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { RatingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  async rating(ratingData: RatingDto): Promise<RatingDto> {
    try {
      if (
        !(
          ratingData.rating === 1 ||
          ratingData.rating === 2 ||
          ratingData.rating === 3 ||
          ratingData.rating === 4 ||
          ratingData.rating === 5
        )
      ) {
        throw new BadRequestException('Acceptable rating values are 1,2,3,4,5');
      }
      const courseInfo = await this.courseRepository.findOne({
        where: { id: ratingData.purchaseId },
        relations: ['note'],
      });
      const newRating = await this.noteRepository.findOne({
        where: { id: courseInfo.note.id },
      });
      newRating.rating = ratingData.rating;
      await this.noteRepository.save(newRating);
      const ratingResponse: RatingDto = {
        purchaseId: courseInfo.id,
        rating: newRating.rating,
      };
      return ratingResponse;
    } catch (err) {
      if (err.status === 400) {
        throw new BadRequestException(err.message);
      }
      throw new BadRequestException('purchaseId Not Exist');
    }
  }
}
