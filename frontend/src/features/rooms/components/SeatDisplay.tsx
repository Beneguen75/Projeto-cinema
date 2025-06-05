import React from 'react';
import styles from './SeatDisplay.module.css'; // Vamos criar este CSS Module a seguir

interface Seat {
  id: string;
  label: string;
  // status: 'available' | 'occupied' | 'selected'; // Para uso futuro (venda de ingressos)
}

interface SeatDisplayProps {
  capacidade: number;
  assentosPorFileira?: number;
}

const SeatDisplay: React.FC<SeatDisplayProps> = ({ 
  capacidade, 
  assentosPorFileira = 10 // Padrão de 10 assentos por fileira, ajuste conforme preferir
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
  
  const numeroAssento = (i % assentosPorFileira) + 1; // Esta é a variável correta para o número
  const label = `${letraDaFileira}${numeroAssento}`; // Usando numeroAssento
  
  seats.push({ id: label, label });
  }

  return (
    <div className={styles.seatDisplayContainer}>
      <div 
        className={styles.seatGrid}
        // Define dinamicamente o número de colunas para o grid CSS
        style={{ gridTemplateColumns: `repeat(${Math.min(capacidade, assentosPorFileira)}, auto)` }}
      >
        {seats.map(seat => (
          <div 
            key={seat.id} 
            className={styles.seat} 
            title={seat.label} // Mostra o label no hover
          >
            {/* Podemos mostrar o label ou apenas a forma do assento,
                ou o label se o assento for grande o suficiente */}
            {seat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatDisplay;