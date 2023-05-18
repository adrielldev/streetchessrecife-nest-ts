import { Injectable, NotFoundException } from '@nestjs/common';
import { Game, PrismaClient } from '@prisma/client';
import { ResponseGetGameDto } from './dto/responseGetGame.dto';
import { BodyPostGameDto, BodyUpdateGameDto } from './dto/bodyPostGame.dto';

@Injectable()
export class GamesService {
  gamesPrisma = new PrismaClient().game;
  playerPrisma = new PrismaClient().player;

  async getAllGames(): Promise<ResponseGetGameDto[]> {
    return await this.gamesPrisma.findMany({
      include: {
        white_player: true,
        black_player: true,
      },
    });
  }

  async createGame(data: BodyPostGameDto): Promise<ResponseGetGameDto> {
    const white_player = await this.playerPrisma.findFirst({
      where: { username: data.white_player },
    });
    const black_player = await this.playerPrisma.findFirst({
      where: {
        username: data.black_player,
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

  async getSingleGame(id: string): Promise<ResponseGetGameDto | null> {
    return await this.gamesPrisma.findUnique({
      where: { id: Number(id) },
      include: {
        black_player: true,
        white_player: true,
      },
    });
  }

  async deleteGame(id: string): Promise<void> {
    await this.gamesPrisma.delete({
      where: { id: Number(id) },
    });
  }

  async updateGame(
    id: string,
    data: BodyUpdateGameDto,
  ): Promise<ResponseGetGameDto | null> {
    // sup q a unica coisa q pode mudar no momento é o winner, uma lógica de reverter rating é feita antes,
    // quando eu adicionar o tipo de partida no banco vai poder alterar tbm isso

    return await this.gamesPrisma.update({
      where: { id: Number(id) },
      data: { winner: data.winner },
      include: { black_player: true, white_player: true },
    });
  }

  async getAllGamesFromPlayer(
    player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    return await this.gamesPrisma.findMany({
      where: {
        OR: [
          {
            black_player_id: player_id,
          },
          {
            white_player_id: player_id,
          },
        ],
      },
      include: {
        white_player: true,
        black_player: true,
      },
    });
  }

  async getAllBlackGamesFromPlayer(
    player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    return await this.gamesPrisma.findMany({
      where: {
        black_player_id: player_id,
      },
      include: {
        white_player: true,
        black_player: true,
      },
    });
  }

  async getAllWhiteGamesFromPlayer(
    player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    return await this.gamesPrisma.findMany({
      where: {
        white_player_id: player_id,
      },
      include: {
        white_player: true,
        black_player: true,
      },
    });
  }

  async getVictories(player_id: number): Promise<any> {
    const player = await this.playerPrisma.findFirst({
      where: { id: player_id },
    });
    if (!player) throw new NotFoundException('player not found');

    return await this.gamesPrisma.findMany({
      where: {
        winner: player.username,
      },
    });
  }

  async getDraws(player_id: number): Promise<any> {
    const player = await this.playerPrisma.findFirst({
      where: {
        id: player_id,
      },
    });
    if (!player) throw new NotFoundException('Player not found');
  }

  async getLoses(player_id: number): Promise<any> {
    const player = await this.playerPrisma.findFirst({
      where: {
        id: player_id,
      },
    });
    if (!player) throw new NotFoundException('Player not found');
  }

  async getGamesAgainstOther(
    player_id: number,
    other_player_id: number,
  ): Promise<any> {
    return await this.gamesPrisma.findMany({
      where: {
        AND: {
          white_player_id: player_id,
          black_player_id: other_player_id,
        },
      },
    });
  }
}
