import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { HistoryModule } from './../src/history/history.module';
import { HistoryService } from './../src/history/history.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let historyService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HistoryModule],
    })
      .overrideProvider(HistoryService)
      .useValue(HistoryService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GETODAS2)', () => {
    return request(app.getHttpServer())
      .get('/history?purchaseId=1')
      .expect(200);
  });
  afterAll(async () => {
    await app.close();
  });
  // const offerRequestData = {
  //   fromLatitude: 48.870377,
  //   fromLongitude: 2.370615,
  //   nbPassengers: 1,
  //   toLatitude: 48.882719,
  //   toLongitude: 2.322451,
  // };
  // it('POST', () => {
  //   return request(app.getHttpServer())
  //     .post('/offer')
  //     .send(JSON.stringify(offerRequestData))
  //     .expect(201);
  // });
  // describe('/offer', () => {

  // });
});
