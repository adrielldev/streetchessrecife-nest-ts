import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GamesService {
  gamesPrisma = new PrismaClient().game;
  playerPrisma = new PrismaClient().player;

  async getAllGames(): Promise<any> {
    return await this.gamesPrisma.findMany({
      include: {
        white_player: true,
        black_player: true,
      },
    });
  }

  async createGame(data: any): Promise<any> {
    const white_player = await this.playerPrisma.findFirst({
      where: { username: data.jogador_brancas },
    });
    const black_player = await this.playerPrisma.findFirst({
      where: {
        username: data.jogador_negras,
      },
    });
    if (!white_player || !black_player)
      throw new NotFoundException('Jogador não encontrado');
    return await this.gamesPrisma.create({
      data: {
        winner: data.winner,
        white_player_id: white_player.id,
        black_player_id: black_player.id,
        type_of_game: data.type_of_game,
        rating_winner: 10,
        rating_loser: 10,
      },
      include: {
        white_player: true,
        black_player: true,
      },
    });
  }

  async getSingleGame(id: string): Promise<any> {
    return await this.gamesPrisma.findUnique({
      where: { id: Number(id) },
      include: {
        black_player: true,
        white_player: true,
      },
    });
  }

  async deleteGame(id: string): Promise<any> {
    await this.gamesPrisma.delete({
      where: { id: Number(id) },
    });
  }

  async updateGame(id: string, data: any): Promise<any> {
    // sup q a unica coisa q pode mudar no momento é o winner, uma lógica de reverter rating é feita antes,
    // quando eu adicionar o tipo de partida no banco vai poder alterar tbm isso

    return await this.gamesPrisma.update({
      where: { id: Number(id) },
      data: { winner: data.winner },
      include: { black_player: true, white_player: true },
    });
  }
}
