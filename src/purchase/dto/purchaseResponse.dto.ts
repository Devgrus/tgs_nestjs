export class PurchaseResponseDto {
  readonly fromAddress: {
    readonly address: string;
    readonly zipCode: string;
    readonly city: string;
    readonly country: string;
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly toAddress: {
    readonly address: string;
    readonly zipCode: string;
    readonly city: string;
    readonly country: string;
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly startDate: string;
  readonly estimatedPrice: number;
}
