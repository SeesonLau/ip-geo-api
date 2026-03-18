import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistory } from './search-history.entity';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory])],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
