import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './dto/history.dto';
import { HistoryResponseDto } from './dto/historyResponse.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getHistory(@Query() historyData: HistoryDto): Promise<HistoryResponseDto> {
    return this.historyService.getHistory(historyData);
  }
}
