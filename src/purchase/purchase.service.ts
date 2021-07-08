import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apiKey, apiUrl } from 'API';
import { Course } from 'src/db/entities/course.entity';
import { Note } from 'src/db/entities/note.entity';
import { Offre } from 'src/db/entities/offre.entity';
import { CourseRepository } from 'src/db/repositories/course.repository';
import { NoteRepository } from 'src/db/repositories/note.repository';
import { OffreRepository } from 'src/db/repositories/offre.repository';
import { PurchaseDto } from './purchaseDto';

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
  async purchase(purchaseData: PurchaseDto) {
    try {
      // interface OfferType {
      //   fromLatitdue: number;
      //   fromLongitude: number;
      //   nbPassengers: number;
      //   toLatitdue: number;
      //   toLongitude: number;
      //   startDate?: string;
      // }
      // const purchaseToOffer: OfferType = {
      //   fromLatitdue: purchaseData.fromAddress.latitude,
      //   fromLongitude: purchaseData.fromAddress.longitude,
      //   nbPassengers: purchaseData.nbPassengers,
      //   toLatitdue: purchaseData.toAddress.latitude,
      //   toLongitude: purchaseData.toAddress.longitude,
      // };
      // if (purchaseData.startDate) {
      //   purchaseToOffer.startDate = purchaseData.startDate;
      // }
      // const getOfferData = await this.httpService
      //   .post('http://localhost:3000/offer', purchaseToOffer)
      //   .pipe()
      //   .toPromise();
      // console.log(getOfferData);
      interface PostDataType {
        clientId: string;
        fromAddress: {
          latitude: number;
          longitude: number;
        };
        nbPassengers: number;
        paymentMethod: string;
        toAddress: {
          latitude: number;
          longitude: number;
        };
        vehicleType: string;
        willBePaidInCash: boolean;
        startDate?: string;
      }
      const sendData: PostDataType = {
        clientId: purchaseData.clientId,
        fromAddress: purchaseData.fromAddress,
        nbPassengers: purchaseData.nbPassengers,
        paymentMethod: purchaseData.paymentMethod,
        toAddress: purchaseData.toAddress,
        vehicleType: purchaseData.vehicleType,
        willBePaidInCash: purchaseData.willBePaidInCash,
      };
      if (purchaseData.startDate) {
        sendData.startDate = purchaseData.startDate;
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
      console.log(resData);
      const offreDB = new Offre();
      offreDB.distance = purchaseData.distance;
      offreDB.duration = purchaseData.duration;
      offreDB.tripType = purchaseData.tripType;
      offreDB.vehicleType = purchaseData.vehicleType;
      offreDB.price = resData.estimatedPrice;
      await this.offreRepository.save(offreDB);

      const noteDB = new Note();
      noteDB.rating = null;
      await this.noteRepository.save(noteDB);

      const purchaseDB = new Course();
      purchaseDB.fromAddress = JSON.stringify(resData.fromAddress);
      purchaseDB.toAddress = JSON.stringify(resData.toAddress);
      purchaseDB.userId = resData.client.userId;
      purchaseDB.offre = offreDB;
      purchaseDB.note = noteDB;
      await this.courseRepository.save(purchaseDB);

      const getData = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.offre', 'offre')
        .leftJoinAndSelect('course.note', 'note')
        .getMany();
      console.log(getData);

      const resDataJson = JSON.stringify(resData);
      return resDataJson;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
