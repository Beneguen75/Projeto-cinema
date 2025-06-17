import React from 'react';
import type { Movie } from '../types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (movieId?: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString();
  };

  return (
    <div className={`${styles.movieCard} card h-100 shadow-sm`}>
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          className={`${styles.movieCardImgTop} card-img-top`}
          alt={`Cartaz do filme ${movie.titulo}`}
        />
      )}
      {!movie.posterUrl && (
         <div className={styles.movieCardImgPlaceholder}>
           <span>Sem Imagem</span>
         </div>
      )}
      <div className={`${styles.movieCardBody} card-body d-flex flex-column`}>
        <h5 className={`${styles.movieCardTitle} card-title text-capitalize`}>{movie.titulo}</h5>
        <p className={styles.movieCardText}><small><strong>Gênero:</strong> {movie.genero}</small></p>
        <p className={styles.movieCardText}><small><strong>Duração:</strong> {movie.duracao} min</small></p>
        <p className={styles.movieCardText}><small><strong>Estreia:</strong> {formatDate(movie.dataEstreia)}</small></p>
        
        <div className={`${styles.movieCardActions} mt-auto d-flex justify-content-end gap-2 pt-2`}>
          <button
            className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
            onClick={() => onEdit(movie)}
          >
            Editar
          </button>
          <button
            className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
            onClick={() => onDelete(movie.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;