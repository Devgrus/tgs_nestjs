import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './historyDto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  history(@Query() historyData: HistoryDto) {
    return this.historyService.history(historyData);
  }
}
