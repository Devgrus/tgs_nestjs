export class PurchaseDto {
  readonly clientId: string;
  readonly distance: number;
  readonly duration: number;
  readonly fromAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly nbPassengers: number;
  readonly paymentMethod: Payment;
  readonly toAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly tripType?: string;
  readonly vehicleType: string;
  readonly willBePaidInCash: boolean;
  readonly startDate?: string;
}

enum Payment {
  IN_APP = 'IN_APP',
  ON_BOARD = 'ON_BOARD',
  DEFERRED = 'DEFERRED',
}
