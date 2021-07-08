import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apiKey, apiUrl } from 'API';
import { Course } from 'src/db/entities/course.entity';
import { Note } from 'src/db/entities/note.entity';
import { Offre } from 'src/db/entities/offre.entity';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { OffreRepository } from 'src/db/repositories/offre.repository';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseRequireDto } from './dto/purchaseRequire.dto';
import { PurchaseResponseDto } from './dto/purchaseResponse.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(OffreRepository)
    private offreRepository: OffreRepository,
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}
  async purchase(purchaseData: PurchaseDto): Promise<PurchaseResponseDto> {
    try {
      const sendData: PurchaseRequireDto = {
        clientId: purchaseData.clientId,
        fromAddress: purchaseData.fromAddress,
        nbPassengers: purchaseData.nbPassengers,
        paymentMethod: purchaseData.paymentMethod,
        toAddress: purchaseData.toAddress,
        vehicleType: purchaseData.vehicleType,
        willBePaidInCash: purchaseData.willBePaidInCash,
      };
      if (purchaseData.startDate) {
        // 30 min restriction
        if (
          new Date(purchaseData.startDate).getTime() <
          new Date().setMinutes(new Date().getMinutes() + 30)
        ) {
          throw new BadRequestException(
            'Reservation must start in minimum 30 minutes',
          );
        } else {
          sendData.startDate = purchaseData.startDate;
        }
      }
      const purchaseDataJson = JSON.stringify(sendData);
      console.log(purchaseDataJson);
      const res = await this.httpService
        .post(`${apiUrl}/trips/new`, purchaseDataJson, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': apiKey,
          },
        })
        .toPromise();
      const resData = res.data;

      // insert datas in offre entity
      const offreDB = new Offre();
      offreDB.distance = purchaseData.distance;
      offreDB.duration = purchaseData.duration;
      offreDB.tripType = purchaseData.tripType;
      offreDB.vehicleType = purchaseData.vehicleType;
      offreDB.price = resData.estimatedPrice;
      await this.offreRepository.save(offreDB);

      // insert datas in note entity
      const noteDB = new Note();
      noteDB.rating = null;
      await this.noteRepository.save(noteDB);

      //transform startDate (YYYY-MM-DD HH:MM)
      const year = new Date(resData.startDate).getFullYear();
      const month = new Date(resData.startDate).getMonth() + 1;
      const date = new Date(resData.startDate).getDate();
      const hour = new Date(resData.startDate).getHours();
      const minute = new Date(resData.startDate).getMinutes();
      const dateTransform =
        [
          year,
          month < 10 ? '0' + month : month,
          date < 10 ? '0' + date : date,
        ].join('-') +
        ' ' +
        [
          hour < 10 ? '0' + hour : hour,
          minute < 10 ? '0' + minute : minute,
        ].join(':');
      resData.startDate = dateTransform;

      // insert datas in course entity
      const courseDB = new Course();
      courseDB.fromAddress = JSON.stringify(resData.fromAddress);
      courseDB.toAddress = JSON.stringify(resData.toAddress);
      courseDB.userId = resData.client.userId;
      courseDB.offre = offreDB;
      courseDB.note = noteDB;
      courseDB.startDate = dateTransform;
      await this.courseRepository.save(courseDB);

      // return data
      const purchaseResponse: PurchaseResponseDto = {
        fromAddress: resData.fromAddress,
        toAddress: resData.toAddress,
        startDate: resData.startDate,
        estimatedPrice: resData.estimatedPrice,
      };
      return purchaseResponse;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
