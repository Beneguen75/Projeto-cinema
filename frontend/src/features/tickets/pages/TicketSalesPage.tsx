import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import type { Session } from '../../sessions/types';
import * as sessionService from '../../sessions/services/session.service';
import * as ticketService from '../services/ticket.service';
import styles from './TicketSalesPage.module.css';
import SeatMap from '../components/SeatMap';

const TicketSalesPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessionData = useCallback(async () => {
    if (!sessionId) {
      setIsLoading(false); 
      return;
    }
    setIsLoading(true);
    try {
      const [sessionData, ticketsData] = await Promise.all([
        sessionService.findOne(sessionId),
        ticketService.getTicketsBySession(sessionId),
      ]);
      setSession(sessionData);
      setOccupiedSeats(ticketsData.map((ticket) => ticket.seatNumber));
    } catch (error) {
      toast.error('Falha ao carregar dados da sessão.');
      navigate('/sessoes');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, navigate]);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  const handleSeatSelect = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handlePurchase = async () => {
    if (selectedSeats.length === 0 || !sessionId) {
      toast.warn('Por favor, selecione pelo menos um assento.');
      return;
    }
    try {
      await ticketService.purchaseTickets({
        sessionId,
        seatNumbers: selectedSeats,
      });
      toast.success(`Ingresso(s) para o(s) assento(s) ${selectedSeats.join(', ')} comprado(s)!`);
      setSelectedSeats([]);
      fetchSessionData();
    } catch (error: any) {
      toast.error(`Falha na compra: ${error.response?.data?.message || 'Erro inesperado'}`);
    }
  };

  if (isLoading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border"></div></div>;
  }

  if (!sessionId) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">
          <h4>Nenhuma sessão selecionada.</h4>
          <p>Para comprar um ingresso, por favor, primeiro selecione uma sessão na página "Em Cartaz".</p>
          <Link to="/sessoes" className="btn btn-primary">Ver Sessões em Cartaz</Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return <div className="alert alert-danger text-center">Sessão não encontrada ou inválida.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sessionHeader}>
        <h1>{session.movie.titulo}</h1>
        <p>{new Date(session.dataHora).toLocaleString('pt-BR')} | Sala {session.room.nome} ({session.formato} - {session.idioma})</p>
      </div>
      <div className={styles.seatingContainer}>
        <div className={styles.screen}>TELA</div>
        <SeatMap
          totalSeats={session.room.capacidade}
          occupiedSeats={occupiedSeats}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />
        <div className={styles.legend}>
          <div className={styles.legendItem}><div className={`${styles.seatSample} ${styles.available}`}></div> Disponível</div>
          <div className={styles.legendItem}><div className={`${styles.seatSample} ${styles.selected}`}></div> Selecionado</div>
          <div className={styles.legendItem}><div className={`${styles.seatSample} ${styles.occupied}`}></div> Ocupado</div>
        </div>
      </div>
      <div className={styles.purchaseSection}>
        <p>Assentos Selecionados: <strong>{selectedSeats.join(', ') || 'Nenhum'}</strong></p>
        <button className="btn btn-primary btn-lg" onClick={handlePurchase} disabled={selectedSeats.length === 0}>
          Confirmar Compra ({selectedSeats.length} ingresso(s))
        </button>
      </div>
    </div>
  );
};

export default TicketSalesPage;