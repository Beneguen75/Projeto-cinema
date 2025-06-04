export interface Movie {
  id?: string;
  titulo: string;
  descricao: string;
  genero: string;
  classificacao: string;
  duracao: number;
  dataEstreia: string;
  posterUrl?: string; // Novo campo para a URL do cartaz
}