import { IsString } from 'class-validator';

export class HistoryDto {
  @IsString()
  readonly purchaseId: string;
}
