import React from 'react';
import styles from './SeatDisplay.module.css'; 

interface Seat {
  id: string;
  label: string;
}

interface SeatDisplayProps {
  capacidade: number;
  assentosPorFileira?: number;
}

const SeatDisplay: React.FC<SeatDisplayProps> = ({ 
  capacidade, 
  assentosPorFileira = 10 
}) => {
  const seats: Seat[] = [];
  const letrasFileira = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < capacidade; i++) {
  const fileiraIndex = Math.floor(i / assentosPorFileira);
  let letraDaFileira: string;

  if (fileiraIndex < letrasFileira.length) {
    letraDaFileira = letrasFileira[fileiraIndex];
  } else {
    letraDaFileira = `X${letrasFileira[fileiraIndex - letrasFileira.length]}`;
  }
  
  const numeroAssento = (i % assentosPorFileira) + 1; 
  const label = `${letraDaFileira}${numeroAssento}`; 
  
  seats.push({ id: label, label });
  }

  return (
    <div className={styles.seatDisplayContainer}>
      <div 
        className={styles.seatGrid}
        style={{ gridTemplateColumns: `repeat(${Math.min(capacidade, assentosPorFileira)}, auto)` }}
      >
        {seats.map(seat => (
          <div 
            key={seat.id} 
            className={styles.seat} 
            title={seat.label}
          >
            {seat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatDisplay;