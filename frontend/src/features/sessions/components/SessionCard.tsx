import type { Session } from '../types';
import styles from './SessionCard.module.css';
import { FaEdit, FaTrashAlt, FaTicketAlt } from 'react-icons/fa';

interface SessionCardProps {
  session: Session;
  onEdit?: (session: Session) => void;
  onDelete?: (sessionId: string) => void;
  onBuyTicket?: (sessionId: string) => void;
}

const SessionCard = ({ session, onEdit, onDelete, onBuyTicket }: SessionCardProps) => {
  const formatDateTime = (isoString: string) => {
    if (!isoString) return 'Data inválida';
    return new Date(isoString).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className={styles.sessionCard}>
      {session.movie?.posterUrl && (
        <img
          src={session.movie.posterUrl}
          alt={`Cartaz do filme ${session.movie.titulo}`}
          className={styles.poster}
        />
      )}

      <div className={styles.sessionInfo}>
        <h5 className={styles.movieTitle}>
          {session.movie?.titulo || 'Filme não encontrado'}
        </h5>

        <div className={styles.details}>
          <p><strong>Sala:</strong> {session.room?.nome || 'Sala não encontrada'}</p>
          <p><strong>Horário:</strong> {formatDateTime(session.dataHora)}</p>
          <p><strong>Preço:</strong> R$ {session.preco.toFixed(2).replace('.', ',')}</p>
          <p><strong>Idioma:</strong> {session.idioma}</p>
          <p><strong>Formato:</strong> {session.formato}</p>
        </div>

        <div className={styles.actions}>
          {onEdit && onDelete && (
            <>
              <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(session)}>
                <FaEdit /> <span className="d-none d-lg-inline">Editar</span>
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(session.id)}>
                <FaTrashAlt /> <span className="d-none d-lg-inline">Excluir</span>
              </button>
            </>
          )}
          {onBuyTicket && (
            <button className="btn btn-success" onClick={() => onBuyTicket(session.id)}>
              <FaTicketAlt /> Comprar Ingresso
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;