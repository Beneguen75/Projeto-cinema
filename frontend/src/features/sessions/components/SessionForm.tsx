import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateSessionDto, Session } from '../types';
import type { Movie } from '../../movies/types';
import type { Room } from '../../rooms/types';
import * as movieService from '../../movies/services/movie.service';
import * as roomService from '../../rooms/services/room.service';
import styles from './SessionForm.module.css';

interface SessionFormProps {
  initialData?: Partial<Session>;
  onSubmit: (data: CreateSessionDto) => void;
  onCancel: () => void;
}

const SessionForm = ({ initialData, onSubmit, onCancel }: SessionFormProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionDto>({
    defaultValues: {
      movieId: initialData?.movie?.id || '',
      roomId: initialData?.room?.id || '',
      dataHora: initialData?.dataHora?.substring(0, 16) || '',
      preco: initialData?.preco || 0,
      idioma: initialData?.idioma || '',
      formato: initialData?.formato || '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await movieService.getAllMovies();
        const roomsData = await roomService.getAllRooms();
        setMovies(moviesData);
        setRooms(roomsData);
      } catch (error) {
        console.error('Falha ao buscar filmes e salas', error);
      }
    };
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className="mb-3">
        <label htmlFor="movieId" className="form-label">Filme</label>
        <select
          id="movieId"
          className={`form-select ${errors.movieId ? 'is-invalid' : ''}`}
          {...register('movieId', { required: 'Filme é obrigatório' })}
        >
          <option value="">Selecione um filme</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>{movie.titulo}</option>
          ))}
        </select>
        {errors.movieId && <div className="invalid-feedback">{errors.movieId.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="roomId" className="form-label">Sala</label>
        <select
          id="roomId"
          className={`form-select ${errors.roomId ? 'is-invalid' : ''}`}
          {...register('roomId', { required: 'Sala é obrigatória' })}
        >
          <option value="">Selecione uma sala</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>{room.nome}</option>
          ))}
        </select>
        {errors.roomId && <div className="invalid-feedback">{errors.roomId.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="dataHora" className="form-label">Data e Hora</label>
        <input
          id="dataHora"
          type="datetime-local"
          className={`form-control ${errors.dataHora ? 'is-invalid' : ''}`}
          {...register('dataHora', { required: 'Data e hora são obrigatórios' })}
        />
        {errors.dataHora && <div className="invalid-feedback">{errors.dataHora.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="preco" className="form-label">Preço</label>
        <input
          id="preco"
          type="number"
          step="0.01"
          className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
          {...register('preco', {
            required: 'Preço é obrigatório',
            valueAsNumber: true,
            min: { value: 0, message: 'Preço não pode ser negativo' },
          })}
        />
        {errors.preco && <div className="invalid-feedback">{errors.preco.message}</div>}
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="idioma" className="form-label">Idioma</label>
          <select
            id="idioma"
            className={`form-select ${errors.idioma ? 'is-invalid' : ''}`}
            {...register('idioma', { required: 'Idioma é obrigatório' })}
          >
            <option value="">Selecione</option>
            <option value="Dublado">Dublado</option>
            <option value="Legendado">Legendado</option>
          </select>
          {errors.idioma && <div className="invalid-feedback">{errors.idioma.message}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="formato" className="form-label">Formato</label>
          <select
            id="formato"
            className={`form-select ${errors.formato ? 'is-invalid' : ''}`}
            {...register('formato', { required: 'Formato é obrigatório' })}
          >
            <option value="">Selecione</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
          {errors.formato && <div className="invalid-feedback">{errors.formato.message}</div>}
        </div>
      </div>


      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </div>
    </form>
  );
};

export default SessionForm;