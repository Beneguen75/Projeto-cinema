import apiClient from '../../../services/apiClient';
import type { CreateSessionDto, Session, UpdateSessionDto } from '../types';

const SESSIONS_ENDPOINT = '/sessions';

export const getAllSessions = async (): Promise<Session[]> => {
  const response = await apiClient.get<Session[]>(SESSIONS_ENDPOINT);
  return response.data;
};

export const findOne = async (id: string): Promise<Session> => {
  const url = `${SESSIONS_ENDPOINT}/${id}`;
  const response = await apiClient.get<Session>(url);
  return response.data;
};

export const createSession = async (data: CreateSessionDto): Promise<Session> => {
  const response = await apiClient.post<Session>(SESSIONS_ENDPOINT, data);
  return response.data;
};

export const updateSession = async (id: string, data: UpdateSessionDto): Promise<Session> => {
  const url = `${SESSIONS_ENDPOINT}/${id}`;
  const response = await apiClient.patch<Session>(url, data);
  return response.data;
};

export const deleteSession = async (id: string): Promise<void> => {
  const url = `${SESSIONS_ENDPOINT}/${id}`;
  await apiClient.delete(url);
};