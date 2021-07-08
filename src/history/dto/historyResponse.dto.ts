export class HistoryResponseDto {
  readonly purchaseId: number;
  readonly userId: string;
  readonly distance: number;
  readonly duration: number;
  readonly fromAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly toAddress: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly startDate: string;
  readonly tripType: string;
  readonly vehicle: string;
  readonly price: number;
  readonly rating: number;
}
