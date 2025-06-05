import React from 'react';
import type { Room } from '../types';
import styles from './RoomCard.module.css';
import SeatDisplay from './SeatDisplay';

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (roomId?: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onEdit, onDelete }) => { // <--- REMOVA renderSeatsPlaceholder DAQUI
  return (
    <div className={`${styles.roomCard} card h-100 shadow-sm`}>
      <div className={`${styles.roomCardBody} card-body d-flex flex-column`}>
        <h5 className={`${styles.roomCardTitle} card-title`}>{room.nome}</h5>
        <p className={styles.roomCardText}><small><strong>Tipo:</strong> {room.tipo}</small></p>
        <p className={styles.roomCardText}><small><strong>Capacidade:</strong> {room.capacidade} lugares</small></p>

        {/* Renderiza o novo componente SeatDisplay */}
        <div className={styles.seatsPlaceholderContainer}> {/* Podemos manter este container ou integrar seus estilos ao SeatDisplay.module.css */}
          <SeatDisplay capacidade={room.capacidade} /> 
          {/* Você pode passar assentosPorFileira aqui se quiser diferente do padrão, ex: <SeatDisplay capacidade={room.capacidade} assentosPorFileira={15} /> */}
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