import {
  BodyPostGameDto,
  BodyUpdateGameDto,
} from 'src/games/dto/bodyPostGame.dto';
import { object, string } from 'yup';

export const CreateGameSchema = object<BodyPostGameDto>({
  result: string()
    .required('Resultado é obrigatório')
    .oneOf(
      ['w', 'b', 'd'],
      'Resultado da partida precisa ser, d=empate,w=brancas,b=negras',
    ),
  white_player: string().required('Jogador de brancas é obrigatório'),
  black_player: string().required('Jogador de negras é obrigatório'),
}).required();

export const UpdateGameSchema = object<BodyUpdateGameDto>({
  result: string()
    .optional()
    .oneOf(
      ['w', 'b', 'd'],
      'Resultado da partida precisa ser, d=empate,w=brancas,b=negras',
    ),
});
