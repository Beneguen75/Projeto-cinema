import apiClient from '../../../services/apiClient'; 
import type { Movie } from '../types';

export type CreateMovieData = Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateMovieData = Partial<CreateMovieData>;

export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get<Movie[]>('/movies');
  return response.data;
};

export const createMovie = async (movieData: CreateMovieData): Promise<Movie> => {
  const response = await apiClient.post<Movie>('/movies', movieData);
  return response.data;
};

export const updateMovie = async (id: string, movieData: UpdateMovieData): Promise<Movie> => {
  const response = await apiClient.patch<Movie>(`/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id: string): Promise<void> => {
  await apiClient.delete(`/movies/${id}`);
};