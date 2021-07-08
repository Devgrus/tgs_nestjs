import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { OffreRepository } from 'src/db/repositories/offre.repository';
import { HistoryDto } from './historyDto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(OffreRepository)
    private offreRepository: OffreRepository,
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  async history(historyData: HistoryDto) {
    try {
      const findAllInfo = await this.courseRepository.findOne({
        where: { id: historyData.courseId },
        relations: ['note', 'offre'],
      });
      const history = {
        courseId: findAllInfo.id,
        userId: findAllInfo.userId,
        distance: findAllInfo.offre.distance,
        duration: findAllInfo.offre.duration,
        fromAddress: JSON.parse(findAllInfo.fromAddress),
        toAddress: JSON.parse(findAllInfo.toAddress),
        tripType: findAllInfo.offre.tripType,
        vehicle: findAllInfo.offre.vehicleType,
        price: findAllInfo.offre.price,
        rating: findAllInfo.note.rating,
      };
      return JSON.stringify(history);
    } catch (err) {
      throw new Error(err);
    }
  }
}
