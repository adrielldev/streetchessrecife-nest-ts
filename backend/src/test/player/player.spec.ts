import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlayerModule } from '../../player/player.module';
import { PlayerService } from '../../player/player.service';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePlayerMock } from '../mocks/PlayerMock';

describe('Testing /player', () => {
  let app: INestApplication;
  let playerService: PlayerService;
  const playerPrisma = new PrismaClient().player;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlayerModule],
    })
      .overrideProvider(PlayerService)
      .useValue(playerService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Should get all players - GET /player', async () => {
    const response = await request(app.getHttpServer()).get('/player');

    // há um problema com a data dos objetos

    expect(response.statusCode).toBe(200);
  });

  it('Should get one player by id - GET /player/:id', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);
    const playerId = createNewPlayer.body.id;
    const response = await request(app.getHttpServer()).get(
      `/player/${playerId}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(playerId);
    await request(app.getHttpServer()).delete(`/player/${playerId}`);
  });

  it('Should throw 404 getting an unexisting player - GET /player/:id', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);
    const playerId = createNewPlayer.body.id;
    await request(app.getHttpServer()).delete(`/player/${playerId}`);
    const response = await request(app.getHttpServer()).get(
      `/player/${playerId}`,
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Usuário inexistente');
  });

  it('Should create a player - POST /player',async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);
    
  })

  afterAll(async () => {
    await app.close();
  });
});
