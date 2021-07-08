export class OfferResponseDto {
  readonly estimation: {
    readonly id: number;
    readonly distance: number;
    readonly duration: number;
    readonly tripType: string;
    readonly vehicleType: string;
    readonly startDate: string;
    readonly price: number;
    readonly priceIncreased: boolean;
  };
}
