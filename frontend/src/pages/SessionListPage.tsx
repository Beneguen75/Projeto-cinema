import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Session } from '../features/sessions/types';
import * as sessionService from '../features/sessions/services/session.service';
import SessionCard from '../features/sessions/components/SessionCard';
import styles from './SessionListPage.module.css';

const SessionListPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await sessionService.getAllSessions();
      setSessions(data);
    } catch (err) {
      toast.error('Falha ao carregar as sessões.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleBuyTicket = (sessionId: string) => {
    navigate(`/ingressos/venda/${sessionId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Sessões em Cartaz</h1>
      <p className={styles.pageSubtitle}>Selecione uma sessão abaixo para comprar seu ingresso.</p>

      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <div key={session.id} className="col-lg-6 mb-4">
                <SessionCard session={session} onBuyTicket={handleBuyTicket} />
              </div>
            ))
          ) : (
            <p>Nenhuma sessão disponível no momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionListPage;