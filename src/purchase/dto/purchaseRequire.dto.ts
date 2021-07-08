export class PurchaseRequireDto {
  readonly clientId: string;
  readonly fromAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly nbPassengers: number;
  readonly paymentMethod: string;
  readonly toAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly vehicleType: string;
  readonly willBePaidInCash: boolean;
  startDate?: string;
}
