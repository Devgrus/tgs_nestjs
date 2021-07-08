import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { apiKey, apiUrl } from 'API';
import { OfferDto } from './OfferDto';

@Injectable()
export class OfferService {
  constructor(private httpService: HttpService) {}

  async getOffers(offerData: OfferDto) {
    // const offerDataJson = JSON.stringify(offerData);
    // return this.httpService
    //   .post('https://api.demo.mysam.fr/api/estimation/all', offerDataJson, {
    //     headers: {
    //       'Content-type': 'application/json',
    //       'x-api-key': apiKey,
    //     },
    //   })
    //   .toPromise()
    //   .then((res) => {
    //     const resData = JSON.stringify(res.data);
    //     //   console.log(resData);
    //     return resData;
    //   })
    //   .catch((err) => {
    //     const errorData = err.response.data;
    //     //   console.log(errorData);
    //     throw new BadRequestException(errorData);
    //   });
    try {
      const offerDataJson = JSON.stringify(offerData);
      const res = await this.httpService
        .post(`${apiUrl}/estimation/all`, offerDataJson, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': apiKey,
          },
        })
        .toPromise();
      const resData = JSON.stringify(res.data);
      return resData;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
