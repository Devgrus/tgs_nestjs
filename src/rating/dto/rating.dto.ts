import { IsNumber } from 'class-validator';

export class RatingDto {
  @IsNumber()
  readonly purchaseId: number;
  @IsNumber()
  readonly rating: number;
}
