import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlayerModule } from '../../player/player.module';
import { PlayerService } from '../../player/player.service';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePlayerMock } from '../mocks/PlayerMock';
import { GamesModule } from '../../games/games.module'
import { GamesService } from '../../games/games.service';


describe('Testing /games', () => {
  let app: INestApplication;
  let gamesService: GamesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GamesModule],
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


  afterAll(async () => {
    await app.close();
  });
});
