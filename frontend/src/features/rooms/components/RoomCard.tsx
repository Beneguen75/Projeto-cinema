import React from 'react';
import type { Room } from '../types';
import styles from './RoomCard.module.css';
import SeatDisplay from './SeatDisplay';

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (roomId?: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onEdit, onDelete }) => { 
  return (
    <div className={`${styles.roomCard} card h-100 shadow-sm`}>
      <div className={`${styles.roomCardBody} card-body d-flex flex-column`}>
        <h5 className={`${styles.roomCardTitle} card-title`}>{room.nome}</h5>
        <p className={styles.roomCardText}><small><strong>Tipo:</strong> {room.tipo}</small></p>
        <p className={styles.roomCardText}><small><strong>Capacidade:</strong> {room.capacidade} lugares</small></p>

        <div className={styles.seatsPlaceholderContainer}> 
          <SeatDisplay capacidade={room.capacidade} /> 
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