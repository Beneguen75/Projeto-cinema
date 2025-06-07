import apiClient from '../../../services/apiClient'; // Importa nosso cliente de API
import type { Movie } from '../types';

// Tipo para dados de criação (sem id, createdAt, updatedAt)
// É similar ao nosso CreateMovieDto do backend
export type CreateMovieData = Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;

// Tipo para dados de atualização (todos os campos são opcionais)
export type UpdateMovieData = Partial<CreateMovieData>;


// Função para buscar todos os filmes
export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get<Movie[]>('/movies');
  return response.data;
};

// Função para criar um novo filme
export const createMovie = async (movieData: CreateMovieData): Promise<Movie> => {
  const response = await apiClient.post<Movie>('/movies', movieData);
  return response.data;
};

// Função para atualizar um filme
export const updateMovie = async (id: string, movieData: UpdateMovieData): Promise<Movie> => {
  const response = await apiClient.patch<Movie>(`/movies/${id}`, movieData);
  return response.data;
};

// Função para deletar um filme
export const deleteMovie = async (id: string): Promise<void> => {
  await apiClient.delete(`/movies/${id}`);
};