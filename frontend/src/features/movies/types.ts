export interface Movie {
  id?: string; // Opcional, pode ser gerado pelo backend ou UUID no frontend
  titulo: string;
  descricao: string;
  genero: string;
  classificacao: string;
  duracao: number; // Em minutos
  dataEstreia: string; // Formato YYYY-MM-DD
  // Adicionar outros campos se necessário no futuro (ex: urlImagemCapa)
}