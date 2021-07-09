import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class PurchaseDto {
  @IsString()
  readonly clientId: string;
  @IsNumber()
  readonly distance: number;
  @IsNumber()
  readonly duration: number;
  @IsObject()
  readonly fromAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  @IsNumber()
  readonly nbPassengers: number;
  @IsString()
  readonly paymentMethod: Payment;
  @IsObject()
  readonly toAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  @IsString()
  readonly tripType: string;
  @IsString()
  readonly vehicleType: string;
  @IsBoolean()
  readonly willBePaidInCash: boolean;
  @IsOptional()
  @IsString()
  readonly startDate?: string;
}

enum Payment {
  IN_APP = 'IN_APP',
  ON_BOARD = 'ON_BOARD',
  DEFERRED = 'DEFERRED',
}
