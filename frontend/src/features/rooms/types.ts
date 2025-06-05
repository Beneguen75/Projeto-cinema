export interface Room {
  id?: string; // Opcional, para identificação única
  nome: string;
  capacidade: number;
  tipo: '2D' | '3D' | 'IMAX' | string; // Tipos predefinidos, mas permite string para outros
}