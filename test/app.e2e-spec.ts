import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { HistoryController } from './../src/history/history.controller';
import { HistoryService } from './../src/history/history.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/ (GETODAS2)', () => {
    return request(app.getHttpServer())
      .get('/history?purchaseId=1')
      .expect(200);
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
