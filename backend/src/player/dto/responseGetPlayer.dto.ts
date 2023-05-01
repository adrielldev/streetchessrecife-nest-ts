export interface ResponseGetPlayerDto {
  name: string;
  username: string;
  rating_blitz: number;
  rating_rapid: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  created_at: Date;
  updated_at: Date;
}
