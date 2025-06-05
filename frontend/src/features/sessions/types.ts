export interface Session {
  id?: string; // ID único para a sessão
  filmeId: string; // ID do filme cadastrado (referenciará o id do filme no localStorage ou backend)
  salaId: string;  // ID da sala cadastrada (referenciará o id da sala no localStorage ou backend)
  dataHora: string; // Formato ISO para data e hora (ex: "2024-07-20T19:00")
  preco: number;
  idioma: 'Dublado' | 'Legendado' | string;
  formato: '2D' | '3D' | string;
  // Podemos adicionar campos para o nome do filme e da sala para facilitar a exibição,
  // ou buscá-los dinamicamente. Por enquanto, vamos manter assim.
  // nomeFilme?: string; // Opcional, para denormalização/display
  // nomeSala?: string;  // Opcional, para denormalização/display
}