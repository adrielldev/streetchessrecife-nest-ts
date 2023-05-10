import { Game } from "@prisma/client";

export interface ResponseGetPlayerDto {
  name: string;
  username: string;
  rating_blitz: number;
  rating_rapid: number;
  victories: number;
  draws: number;
  loses: number;
  created_at: Date;
  games?: Game[]
  updated_at: Date;
}
