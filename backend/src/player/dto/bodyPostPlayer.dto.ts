export interface BodyPostPlayerDto {
  name: string;
  username: string;
}

export interface BodyUpdatePlayerDto extends BodyPostPlayerDto{
  vitorias?:string;
  derrotas?:string;
  empates?:string;
  rating_blitz?: number,
	rating_rapid?: number,

  
}