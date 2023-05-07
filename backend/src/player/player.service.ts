import { Injectable } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayerService {
  playerPrisma = new PrismaClient().player;

  async getAllPlayers(): Promise<any[]> {
    return await this.playerPrisma.findMany({
      include: {
        black_games: true,
        white_games: true,
      },
    });
  }

  async createPlayer(data: any): Promise<any> {
    return await this.playerPrisma.create({
      data: {
        name: data.name,
        username: data.username,
      },
    });
  }

  async getSinglePlayer(id: string): Promise<any | null> {
    return await this.playerPrisma.findFirst({
      where: { id: Number(id) },
    });
  }

  async updatePlayer(id: string, data: any) {
    return await this.playerPrisma.update({
      where: { id: Number(id) },
      data: { rating_blitz: data.rating_blitz },
    });
  }
  async deletePlayer(id: string): Promise<void> {
    await this.playerPrisma.delete({
      where: { id: Number(id) },
    });
  }
}
