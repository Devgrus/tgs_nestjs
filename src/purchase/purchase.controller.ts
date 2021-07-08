import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseResponseDto } from './dto/purchaseResponse.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  purchase(@Body() purchaseData: PurchaseDto): Promise<PurchaseResponseDto> {
    return this.purchaseService.purchase(purchaseData);
  }
}
