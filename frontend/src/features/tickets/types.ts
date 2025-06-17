
export interface Ticket {
  id: string;
  seatNumber: string;
  sessionId: string;
}

export interface CreateTicketDto {
  sessionId: string;
  seatNumbers: string[];
}