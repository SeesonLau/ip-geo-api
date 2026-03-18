import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SearchHistory } from './search-history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(SearchHistory)
    private historyRepo: Repository<SearchHistory>,
  ) {}

  async save(userId: number, ip: string, data: object): Promise<SearchHistory> {
    const existing = await this.historyRepo.findOne({ where: { userId, ip } });
    if (existing) {
      existing.data = data;
      return this.historyRepo.save(existing);
    }
    const entry = this.historyRepo.create({ userId, ip, data });
    return this.historyRepo.save(entry);
  }

  async findByUser(userId: number): Promise<SearchHistory[]> {
    return this.historyRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteMany(userId: number, ids: number[]): Promise<void> {
    await this.historyRepo.delete({ userId, id: In(ids) });
  }
}
