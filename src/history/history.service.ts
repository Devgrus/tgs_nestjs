import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../db/repositories/course.repository';
import { HistoryDto } from './dto/history.dto';
import { HistoryResponseDto } from './dto/historyResponse.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async getHistory(historyData: HistoryDto): Promise<HistoryResponseDto> {
    try {
      const findAllInfo = await this.courseRepository.findOne({
        where: { id: +historyData.purchaseId },
        relations: ['note', 'offre'],
      });
      const historyResponse: HistoryResponseDto = {
        purchaseId: findAllInfo.id,
        userId: findAllInfo.userId,
        distance: findAllInfo.offre.distance,
        duration: findAllInfo.offre.duration,
        fromAddress: JSON.parse(findAllInfo.fromAddress),
        toAddress: JSON.parse(findAllInfo.toAddress),
        tripType: findAllInfo.offre.tripType,
        vehicle: findAllInfo.offre.vehicleType,
        price: findAllInfo.offre.price,
        rating: findAllInfo.note.rating,
        startDate: findAllInfo.startDate,
      };
      return historyResponse;
    } catch (err) {
      throw new BadRequestException('purchaseId No Exist');
    }
  }
}
