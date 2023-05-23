import { Injectable, NotFoundException } from '@nestjs/common';
import { Game, PrismaClient } from '@prisma/client';
import { ResponseGetGameDto } from './dto/responseGetGame.dto';
import { BodyPostGameDto, BodyUpdateGameDto } from './dto/bodyPostGame.dto';
import { EloRating } from 'src/utils/functions';

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

    const objRating = EloRating(
      white_player.rating_rapid,
      black_player.rating_rapid,
      data.result,
    );

    await this.playerPrisma.update({
      where: { id: white_player.id },
      data: {
        rating_rapid: Math.round(objRating.rating_a),
        victories:
          data.result == 'w'
            ? white_player.victories + 1
            : white_player.victories,
        draws: data.result == 'd' ? white_player.draws + 1 : white_player.draws,
        loses: data.result == 'b' ? white_player.loses + 1 : white_player.loses,
      },
    });

    await this.playerPrisma.update({
      where: { id: black_player.id },
      data: {
        rating_rapid: Math.round(objRating.rating_b),
        victories:
          data.result == 'w'
            ? black_player.victories + 1
            : black_player.victories,
        draws: data.result == 'd' ? black_player.draws + 1 : black_player.draws,
        loses: data.result == 'b' ? black_player.loses + 1 : black_player.loses,
      },
    });

    return await this.gamesPrisma.create({
      data: {
        result: data.result,
        white_player_id: white_player.id,
        black_player_id: black_player.id,
        rating_white_player: Math.round(objRating.rating_a),
        rating_black_player: Math.round(objRating.rating_b),
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
    return await this.gamesPrisma.update({
      where: { id: Number(id) },
      data: { result: data.result },
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

  async getVictories(player_id: number): Promise<ResponseGetGameDto[]> {
    const player = await this.playerPrisma.findFirst({
      where: { id: player_id },
    });
    if (!player) throw new NotFoundException('player not found');
    return await this.gamesPrisma.findMany({
      where: {
        OR: [
          { AND: [{ white_player_id: player_id }, { result: 'w' }] },
          { AND: [{ black_player_id: player_id }, { result: 'b' }] },
        ],
      },
      include: { white_player: true, black_player: true },
    });
  }

  async getDraws(player_id: number): Promise<ResponseGetGameDto[]> {
    const player = await this.playerPrisma.findFirst({
      where: {
        id: player_id,
      },
    });
    if (!player) throw new NotFoundException('Player not found');
    return await this.gamesPrisma.findMany({
      where: {
        OR: [
          { AND: [{ white_player_id: player_id }, { result: 'd' }] },
          { AND: [{ black_player_id: player_id }, { result: 'd' }] },
        ],
      },
      include: { black_player: true, white_player: true },
    });
  }

  async getLoses(player_id: number): Promise<ResponseGetGameDto[]> {
    const player = await this.playerPrisma.findFirst({
      where: {
        id: player_id,
      },
    });
    if (!player) throw new NotFoundException('Player not found');

    return await this.gamesPrisma.findMany({
      where: {
        OR: [
          { AND: [{ white_player_id: player_id }, { result: 'b' }] },
          { AND: [{ black_player_id: player_id }, { result: 'w' }] },
        ],
      },
      include: { black_player: true, white_player: true },
    });
  }

  async getGamesAgainstOther(
    player_id: number,
    other_player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    return await this.gamesPrisma.findMany({
      where: {
        OR: [
          {
            AND: [
              { white_player_id: player_id },
              { black_player_id: other_player_id },
            ],
          },
          {
            AND: [
              { black_player_id: player_id },
              { white_player_id: other_player_id },
            ],
          },
        ],
      },
      include: { black_player: true, white_player: true },
    });
  }
}
