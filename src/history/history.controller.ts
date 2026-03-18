import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HistoryService } from './history.service';
import { SaveHistoryDto } from './dto/save-history.dto';
import { DeleteHistoryDto } from './dto/delete-history.dto';

interface AuthenticatedRequest extends Request {
  user: { id: number; email: string };
}

@Controller('api/history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    try {
      return await this.historyService.findByUser(req.user.id);
    } catch {
      throw new InternalServerErrorException('Failed to retrieve history');
    }
  }

  @Post()
  async save(@Req() req: AuthenticatedRequest, @Body() saveHistoryDto: SaveHistoryDto) {
    try {
      return await this.historyService.save(req.user.id, saveHistoryDto.ip, saveHistoryDto.data);
    } catch {
      throw new InternalServerErrorException('Failed to save history');
    }
  }

  @Delete()
  async deleteMany(@Req() req: AuthenticatedRequest, @Body() deleteHistoryDto: DeleteHistoryDto) {
    try {
      await this.historyService.deleteMany(req.user.id, deleteHistoryDto.ids);
      return { success: true };
    } catch {
      throw new InternalServerErrorException('Failed to delete history');
    }
  }
}
