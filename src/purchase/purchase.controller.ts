import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './purchaseDto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  purchase(@Body() purchaseData: PurchaseDto) {
    return this.purchaseService.purchase(purchaseData);
  }
}
