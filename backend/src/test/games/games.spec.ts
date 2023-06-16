import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOtherPlayerMock, CreatePlayerMock } from '../mocks/PlayerMock';
import { GamesModule } from '../../games/games.module';
import { GamesService } from '../../games/games.service';
import {
  CreateGameMock,
  PlayerDoesntExistGameMock,
  SamePlayerGameMock,
  UpdateGameMock,
} from '../mocks/GamesMock';
import { PlayerModule } from '../../player/player.module';

describe('Testing /games', () => {
  let app: INestApplication;
  let gamesService: GamesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GamesModule, PlayerModule],
    })
      .overrideProvider(gamesService)
      .useValue(gamesService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Should get all games - GET /games', async () => {
    const response = await request(app.getHttpServer()).get('/games');

    expect(response.statusCode).toBe(200);
  });

  it('Should get a single game - GET /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    const createNewGame = await request(app.getHttpServer()).get(
      `/games/${newGame.body.id}`,
    );

    expect(createNewGame.statusCode).toBe(200);
    expect(createNewGame.body.result).toBe('w');
    expect(createNewGame.body.rating_white_player).toBeGreaterThan(1500);
    expect(createNewGame.body.rating_black_player).toBeLessThan(1500);

    await request(app.getHttpServer()).delete(
      `/games/${createNewGame.body.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${createNewGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${createNewGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get a game with invalid id - GET /games/:id', async () => {
    const unexistentGame = await request(app.getHttpServer()).get(
      `/games/123141`,
    );
    expect(unexistentGame.statusCode).toBe(404);
    expect(unexistentGame.body.message).toBe('Jogo não encontrado');
  });

  it('Should create a game - POST /games', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    expect(newGame.statusCode).toBe(201);
    expect(newGame.body.result).toBe('w');
    expect(newGame.body.rating_white_player).toBeGreaterThan(1500);
    expect(newGame.body.rating_black_player).toBeLessThan(1500);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt create a game without required fields - POST /games', async () => {
    const server = app.getHttpServer();

    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    expect(newGame.statusCode).toBe(404);
  });

  it('Shouldnt create a game with same player as black and white - POST /games', async () => {
    const player = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(SamePlayerGameMock);

    expect(newGame.statusCode).toBe(400);
    expect(newGame.body.message).toBe('Não é possível jogar consigo mesmo');

    await request(app.getHttpServer()).delete(`/player/${player.body.id}`);
  });

  it('Shouldnt create a game where one of the players dont exist - POST /games', async () => {
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(PlayerDoesntExistGameMock);

    expect(newGame.statusCode).toBe(404);
    expect(newGame.body.message).toBe('Um dos jogadores não encontrado');
  });

  it('Should update a game - PUT /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const updateGame = await request(app.getHttpServer())
      .put(`/games/${newGame.body.id}`)
      .send(UpdateGameMock);

    expect(updateGame.statusCode).toBe(200);
    expect(updateGame.body.result).toBe(UpdateGameMock.result);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt update a game that doesnt exist - PUT /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    const deletedGame = await request(app.getHttpServer()).get(
      `/games/${newGame.body.id}`,
    );
    expect(deletedGame.statusCode).toBe(404);
    expect(deletedGame.body.message).toBe('Jogo não encontrado');

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Should delete a game - DELETE /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const deletedGame = await request(app.getHttpServer()).delete(
      `/games/${newGame.body.id}`,
    );

    expect(deletedGame.statusCode).toBe(200);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt delete a game with invalid id - DELETE /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    const deletedGame = await request(app.getHttpServer()).delete(
      `/games/${newGame.body.id}`,
    );

    expect(deletedGame.statusCode).toBe(404);
    expect(deletedGame.body.message).toBe('Jogo não encontrado');

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Should get all games from player - GET /games/player/:player_id', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${newPlayer.body.id}`,
    );
    expect(gamesFromPlayer.statusCode).toBe(200);
    expect(gamesFromPlayer.body.length).toBe(1);
    expect(gamesFromPlayer.body[0].result).toBe('w');

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all games from player that unexistent id - GET /games/player/:player_id', async () => {
    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/3233213`,
    );
    expect(gamesFromPlayer.statusCode).toBe(404);
    expect(gamesFromPlayer.body.message).toBe('Usuário não encontrado');
  });

  it('Should get all black games from player - GET /games/player/:player_id/black', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${newPlayer.body.id}/black`,
    );
    expect(gamesFromPlayer.statusCode).toBe(200);
    expect(gamesFromPlayer.body.length).toBe(0);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all black games from a unexistent player - GET /games/player/:player_id/black', async () => {
    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${312321312}/black`,
    );
    expect(gamesFromPlayer.statusCode).toBe(404);
    expect(gamesFromPlayer.body.message).toBe('Usuário não encontrado');
  });

  it('Should get all white games from player - GET /games/player/:player_id/white', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${newPlayer.body.id}/white`,
    );
    expect(gamesFromPlayer.statusCode).toBe(200);
    expect(gamesFromPlayer.body.length).toBe(1);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all white games from a unexistent player - GET /games/player/:player_id/white', async () => {
    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${312321312}/white`,
    );
    expect(gamesFromPlayer.statusCode).toBe(404);
    expect(gamesFromPlayer.body.message).toBe('Usuário não encontrado');
  });

  it('Should get all victories from player - GET /games/player/:player_id/victories', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${newPlayer.body.id}/victories`,
    );
    expect(gamesFromPlayer.statusCode).toBe(200);
    expect(gamesFromPlayer.body.length).toBe(1);
    expect(gamesFromPlayer.body[0].result).toBe('w');

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all victories from a unexistent player - GET /games/player/:player_id/victories', async () => {
    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${312321312}/victories`,
    );
    expect(gamesFromPlayer.statusCode).toBe(404);
    expect(gamesFromPlayer.body.message).toBe('Usuário não encontrado');
  });

  it('Should get all loses from player - GET /games/player/:player_id/loses', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${newPlayer.body.id}/loses`,
    );
    expect(gamesFromPlayer.statusCode).toBe(200);
    expect(gamesFromPlayer.body.length).toBe(0);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all loses from a unexistent player - GET /games/player/:player_id/loses', async () => {
    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${312321312}/loses`,
    );
    expect(gamesFromPlayer.statusCode).toBe(404);
    expect(gamesFromPlayer.body.message).toBe('Usuário não encontrado');
  });

  it('Should get all draws from player - GET /games/player/:player_id/draws', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${newPlayer.body.id}/draws`,
    );
    expect(gamesFromPlayer.statusCode).toBe(200);
    expect(gamesFromPlayer.body.length).toBe(0);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all draws from a unexistent player - GET /games/player/:player_id/draws', async () => {
    const gamesFromPlayer = await request(app.getHttpServer()).get(
      `/games/player/${312321312}/draws`,
    );
    expect(gamesFromPlayer.statusCode).toBe(404);
    expect(gamesFromPlayer.body.message).toBe('Usuário não encontrado');
  });

  it('Should get all games from player against another player - GET /games/player/:player_id/:other_player_id', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const otherPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreateOtherPlayerMock);

    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    const gamesFromPlayerAgainstAnother = await request(
      app.getHttpServer(),
    ).get(`/games/player/${newPlayer.body.id}/${otherPlayer.body.id}`);
    expect(gamesFromPlayerAgainstAnother.statusCode).toBe(200);
    expect(gamesFromPlayerAgainstAnother.body.length).toBe(1);
    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);

    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get all games from player against another player when someone doesnt exist  - GET /games/player/:player_id/:other_player_id', async () => {
    const gamesFromPlayerAgainstAnother = await request(
      app.getHttpServer(),
    ).get(`/games/player/3123123123/3123123`);
    expect(gamesFromPlayerAgainstAnother.statusCode).toBe(404);
    expect(gamesFromPlayerAgainstAnother.body.message).toBe(
      'Um dos jogadores não existe',
    );
  });

  it('Shouldnt get all games from player against himself - GET /games/player/:player_id/:other_player_id', async () => {
    const newPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const gamesFromPlayerAgainstHimself = await request(
      app.getHttpServer(),
    ).get(`/games/player/${newPlayer.body.id}/${newPlayer.body.id}`);
    expect(gamesFromPlayerAgainstHimself.statusCode).toBe(400);
    expect(gamesFromPlayerAgainstHimself.body.message).toBe(
      'Não existem jogos do jogador contra si mesmo',
    );

    await request(app.getHttpServer()).delete(`/player/${newPlayer.body.id}`);
  });

  afterAll(async () => {
    await app.close();
  });
});
