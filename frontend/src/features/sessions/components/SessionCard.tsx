import React from 'react';
import type { Session } from '../types';
import type { Movie } from '../../movies/types'; // Importando para ter a info do filme
import type { Room } from '../../rooms/types';   // Importando para ter a info da sala
import styles from './SessionCard.module.css';    // Criaremos este CSS a seguir
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Ícones para os botões

interface SessionCardProps {
  session: Session;
  movie?: Movie; // Opcional, caso o filme não seja encontrado
  room?: Room;   // Opcional, caso a sala não seja encontrada
  onEdit: (session: Session) => void;
  onDelete: (sessionId?: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, movie, room, onEdit, onDelete }) => {
  // Função para formatar a data e hora de forma mais legível
  const formatDateTime = (isoString: string) => {
    if (!isoString) return 'Data inválida';
    return new Date(isoString).toLocaleString('pt-BR', {
      dateStyle: 'short', // ex: 05/06/2025
      timeStyle: 'short', // ex: 18:24
    });
  };

  return (
    <div className={styles.sessionCard}>
      {/* Mostra o cartaz do filme, se a URL existir */}
      {movie?.posterUrl && (
        <img 
          src={movie.posterUrl} 
          alt={`Cartaz do filme ${movie.titulo}`} 
          className={styles.poster} 
        />
      )}

      <div className={styles.sessionInfo}>
        <h5 className={styles.movieTitle}>
          {movie?.titulo || 'Filme não encontrado'}
        </h5>

        <div className={styles.details}>
          <p><strong>Sala:</strong> {room?.nome || 'Sala não encontrada'}</p>
          <p><strong>Horário:</strong> {formatDateTime(session.dataHora)}</p>
          <p><strong>Preço:</strong> R$ {session.preco.toFixed(2).replace('.', ',')}</p>
          <p><strong>Idioma:</strong> {session.idioma}</p>
          <p><strong>Formato:</strong> {session.formato}</p>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(session)}>
            <FaEdit /> <span className="d-none d-lg-inline">Editar</span>
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(session.id)}>
            <FaTrashAlt /> <span className="d-none d-lg-inline">Excluir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;