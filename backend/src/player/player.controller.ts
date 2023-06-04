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
import { HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { BodyPostPlayerDto } from './dto/bodyPostPlayer.dto';
import { ResponseGetPlayerDto } from './dto/responseGetPlayer.dto';
import { CreatePlayerSchema, UpdatePlayerSchema } from 'src/schemas/PlayerSchema';
import { YupValidationPipe } from 'src/pipes/YupValidationPipe';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get('ranking')
  async getRapidRanking(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerService.getRapidRanking();
  }


  @Get()
  async getAllPlayers(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerService.getAllPlayers();
  }

  @UsePipes(new YupValidationPipe(CreatePlayerSchema))
  @Post()
  async createPlayer(
    @Body() data: BodyPostPlayerDto,
  ): Promise<ResponseGetPlayerDto> {
    return await this.playerService.createPlayer(data);
  }

  @Get(':id')
  async getSinglePlayer(
    @Param('id') id: string,
  ): Promise<ResponseGetPlayerDto | null> {
    return await this.playerService.getSinglePlayer(id);
  }

  @UsePipes(new YupValidationPipe(UpdatePlayerSchema))
  @Put(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() data: BodyPostPlayerDto,
  ): Promise<ResponseGetPlayerDto> {
    return await this.playerService.updatePlayer(id, data);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string): Promise<HttpStatus> {
    await this.playerService.deletePlayer(id);
    return HttpStatus.NO_CONTENT;
  }

  
}
