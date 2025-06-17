import React from 'react';
import styles from './SeatMap.module.css';

interface SeatMapProps {
  totalSeats: number;
  occupiedSeats: string[];
  selectedSeats: string[];
  onSeatSelect: (seatNumber: string) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({
  totalSeats,
  occupiedSeats,
  selectedSeats,
  onSeatSelect,
}) => {
  const generateSeats = () => {
    const seats = [];
    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const seatsPerRow = 10;

    for (let i = 0; i < totalSeats; i++) {
      const seatNumber = `${rows[Math.floor(i / seatsPerRow)]}${(i % seatsPerRow) + 1}`;

      const isOccupied = occupiedSeats.includes(seatNumber);
      const isSelected = selectedSeats.includes(seatNumber);

      let seatClass = styles.seat;
      if (isOccupied) {
        seatClass += ` ${styles.occupied}`;
      } else if (isSelected) {
        seatClass += ` ${styles.selected}`;
      }

      seats.push(
        <div
          key={seatNumber}
          className={seatClass}
          onClick={() => !isOccupied && onSeatSelect(seatNumber)}
        >
          {seatNumber}
        </div>
      );
    }
    return seats;
  };

  return <div className={styles.seatMap}>{generateSeats()}</div>;
};

export default SeatMap;