import apiClient from "../../../services/apiClient";
import type { CreateRoomDto, Room, UpdateRoomDto } from "../types";

const ROOMS_ENDPOINT = "/rooms";

export const getAllRooms = async (): Promise<Room[]> => {
  const response = await apiClient.get<Room[]>(ROOMS_ENDPOINT);
  return response.data;
};

export const createRoom = async (data: CreateRoomDto): Promise<Room> => {
  const response = await apiClient.post<Room>(ROOMS_ENDPOINT, data);
  return response.data;
};

export const updateRoom = async (id: string, data: UpdateRoomDto): Promise<Room> => {
  const response = await apiClient.patch<Room>(`<span class="math-inline">\{ROOMS\_ENDPOINT\}/</span>{id}`, data);
  return response.data;
};

export const deleteRoom = async (id: string): Promise<void> => {
  await apiClient.delete(`<span class="math-inline">\{ROOMS\_ENDPOINT\}/</span>{id}`);
};