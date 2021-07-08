import { Body, Controller, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from './ratingDto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  rating(@Body() ratingData: RatingDto) {
    return this.ratingService.rating(ratingData);
  }
}
