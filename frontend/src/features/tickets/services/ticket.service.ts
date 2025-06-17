import apiClient from '../../../services/apiClient';
import type { CreateTicketDto, Ticket } from '../types';

const TICKETS_ENDPOINT = '/tickets';

export const getTicketsBySession = async (sessionId: string): Promise<Ticket[]> => {

  const url = `${TICKETS_ENDPOINT}/session/${sessionId}`;
  const response = await apiClient.get<Ticket[]>(url);
  return response.data;
};

export const purchaseTickets = async (data: CreateTicketDto) => {
  const response = await apiClient.post(TICKETS_ENDPOINT, data);
  return response.data;
};