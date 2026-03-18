import { Controller, Get, Post, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HistoryService } from './history.service';

@Controller('api/history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async findAll(@Request() req) {
    return this.historyService.findByUser(req.user.id);
  }

  @Post()
  async save(@Request() req, @Body() body: { ip: string; data: object }) {
    return this.historyService.save(req.user.id, body.ip, body.data);
  }

  @Delete()
  async deleteMany(@Request() req, @Body() body: { ids: number[] }) {
    await this.historyService.deleteMany(req.user.id, body.ids);
    return { success: true };
  }
}
