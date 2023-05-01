import { Injectable } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';
import { ResponseGetPlayerDto } from './dto/responseGetPlayer.dto';
import { BodyPostPlayerDto } from './dto/bodyPostPlayer.dto';

@Injectable()
export class PlayerService {
  playerPrisma = new PrismaClient().player;

  async getAllPlayers(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerPrisma.findMany();
  }

  async createPlayer(data: BodyPostPlayerDto): Promise<ResponseGetPlayerDto> {
    return await this.playerPrisma.create({
      data: {
        name: data.name,
        username: data.username,
      },
    });
  }

  async getSinglePlayer(id: number): Promise<ResponseGetPlayerDto | null> {
    return await this.playerPrisma.findFirst({
      where: { id },
    });
  }

  async updatePlayer(id: string, data: any) {
    return await this.playerPrisma.update({
      where: { id: Number(id) },
      data: { rating_blitz: data.rating_blitz },
    });
  }
  async deletePlayer(id: string) {
    await this.playerPrisma.delete({
      where: { id: Number(id) },
    });
  }
}
