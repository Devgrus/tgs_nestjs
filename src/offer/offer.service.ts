import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { apiKey, apiUrl } from 'API';
import { OfferDto } from './dto/offer.dto';
import { OfferResponseDto } from './dto/offerResponse.dto';

@Injectable()
export class OfferService {
  constructor(private httpService: HttpService) {}

  async getOffers(offerData: OfferDto): Promise<OfferResponseDto> {
    try {
      if (
        offerData.startDate &&
        new Date(offerData.startDate).getTime() <
          new Date().setMinutes(new Date().getMinutes() + 30)
      ) {
        throw new BadRequestException(
          'Reservation must start in minimum 30 minutes',
        );
      }
      const offerDataJson = JSON.stringify(offerData);
      const res = await this.httpService
        .post(`${apiUrl}/estimation/all`, offerDataJson, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': apiKey,
          },
        })
        .toPromise();

      // change startDate value type (number => string)
      res.data.forEach((res) => {
        const year = new Date(res.estimation.startDate).getFullYear();
        const month = new Date(res.estimation.startDate).getMonth() + 1;
        const date = new Date(res.estimation.startDate).getDate();
        const hour = new Date(res.estimation.startDate).getHours();
        const minute = new Date(res.estimation.startDate).getMinutes();
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
        res.estimation.startDate = dateTransform;
      });

      return res.data;
    } catch (err) {
      if (err.status === 400) {
        throw new BadRequestException(err.message);
      }
      throw new Error('Internal Error');
    }
  }
}
