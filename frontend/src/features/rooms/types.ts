export interface Room {
  id: string; 
  nome: string;
  capacidade: number;
  tipo: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateRoomDto = Omit<Room, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateRoomDto = Partial<CreateRoomDto>;