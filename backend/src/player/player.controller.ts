import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { PlayerService } from './player.service';
import { HttpStatus } from '@nestjs/common';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  async getAllPlayers(): Promise<any[]> {
    return await this.playerService.getAllPlayers();
  }

  @Post()
  async createPlayer(@Body() data: any): Promise<any> {
    return await this.playerService.createPlayer(data);
  }

  @Get(':id')
  async getSinglePlayer(@Param('id') id: string): Promise<any | null> {
    return await this.playerService.getSinglePlayer(id);
  }

  @Put(':id')
  async updatePlayer(@Param('id') id: string, @Body() data: any): Promise<any> {
    return await this.playerService.updatePlayer(id, data);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string): Promise<HttpStatus> {
    await this.playerService.deletePlayer(id);
    return HttpStatus.NO_CONTENT;
  }
}
