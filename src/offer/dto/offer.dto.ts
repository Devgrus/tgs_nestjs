import { IsNumber, IsString } from 'class-validator';

export class OfferDto {
  @IsNumber()
  readonly fromLatitude: number;
  @IsNumber()
  readonly fromLongitude: number;
  @IsNumber()
  readonly nbPassengers: number;
  @IsString()
  readonly startDate?: string;
  @IsNumber()
  readonly toLatitude: number;
  @IsNumber()
  readonly toLongitude: number;
}
