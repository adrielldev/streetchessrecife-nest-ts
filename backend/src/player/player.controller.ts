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
  async getAllPlayers() {
    return await this.playerService.getAllPlayers();
  }

  @Post()
  async createPlayer(@Body() data: any) {
    return await this.playerService.createPlayer(data);
  }

  @Get(':id')
  async getSinglePlayer(@Param('id') param: { id: number }) {
    return await this.playerService.getSinglePlayer(param.id);
  }

  @Put(':id')
  async updatePlayer(@Param('id') id: number, @Body() data: any) {
    return await this.playerService.updatePlayer(id, data);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: number) {
    await this.playerService.deletePlayer(id);
    return HttpStatus.NO_CONTENT;
  }
}
