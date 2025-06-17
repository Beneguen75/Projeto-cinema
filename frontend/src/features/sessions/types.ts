import type { Movie } from '../movies/types';
import type { Room } from '../rooms/types';

export interface Session {
  id: string;
  dataHora: string;
  preco: number;
  idioma: string;
  formato: string;
  createdAt: string;
  updatedAt: string;
  movie: Movie;
  room: Room;
}

export interface CreateSessionDto {
  dataHora: string;
  preco: number;
  idioma: string;
  formato: string;
  movieId: string;
  roomId: string;
}

export type UpdateSessionDto = Partial<CreateSessionDto>;