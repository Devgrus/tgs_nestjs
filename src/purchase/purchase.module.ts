import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../db/repositories/course.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { OffreRepository } from '../db/repositories/offre.repository';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      OffreRepository,
      CourseRepository,
      NoteRepository,
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
