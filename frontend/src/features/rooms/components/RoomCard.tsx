import React from 'react';
import type { Room } from '../types';
import styles from './RoomCard.module.css'; // Vamos criar este CSS Module

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (roomId?: string) => void;
  renderSeatsPlaceholder: (capacidade: number) => React.ReactNode; // Passando a função como prop
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onEdit, onDelete, renderSeatsPlaceholder }) => {
  return (
    <div className={`${styles.roomCard} card h-100 shadow-sm`}>
      <div className={`${styles.roomCardBody} card-body d-flex flex-column`}>
        <h5 className={`${styles.roomCardTitle} card-title`}>{room.nome}</h5>
        <p className={styles.roomCardText}><small><strong>Tipo:</strong> {room.tipo}</small></p>
        <p className={styles.roomCardText}><small><strong>Capacidade:</strong> {room.capacidade} lugares</small></p>

        {/* Renderiza o placeholder de assentos passado como prop */}
        <div className={styles.seatsPlaceholderContainer}>
          {renderSeatsPlaceholder(room.capacidade)}
        </div>

        <div className={`${styles.roomCardActions} mt-auto d-flex justify-content-end gap-2 pt-3`}>
          <button
            className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
            onClick={() => onEdit(room)}
          >
            Editar
          </button>
          <button
            className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
            onClick={() => onDelete(room.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;