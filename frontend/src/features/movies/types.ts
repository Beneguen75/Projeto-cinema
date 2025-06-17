export interface Movie {
  id?: string;
  titulo: string;
  descricao: string;
  genero: string;
  classificacao: string;
  duracao: number;
  dataEstreia: string;
  posterUrl?: string; 
}