import React, { useState, useEffect } from 'react';
import type { Session } from '../types';
import type { Movie } from '../../movies/types';
import type { Room } from '../../rooms/types';
import styles from './SessionForm.module.css';

interface SessionFormProps {
  initialData?: Partial<Session>;
  onSubmit: (session: Omit<Session, 'id'>) => void;
  onCancel?: () => void;
  availableMovies: Movie[];
  availableRooms: Room[];
}

const SessionForm: React.FC<SessionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  availableMovies,
  availableRooms,
}) => {
  const [filmeId, setFilmeId] = useState(initialData?.filmeId || '');
  const [salaId, setSalaId] = useState(initialData?.salaId || '');
  const [dataHora, setDataHora] = useState(initialData?.dataHora || '');
  const [preco, setPreco] = useState<number | string>(initialData?.preco || '');
  const [idioma, setIdioma] = useState(initialData?.idioma || '');
  const [formato, setFormato] = useState(initialData?.formato || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFilmeId(initialData.filmeId || '');
      setSalaId(initialData.salaId || '');
      const initialDateTime = initialData.dataHora ? initialData.dataHora.substring(0, 16) : '';
      setDataHora(initialDateTime);
      setPreco(initialData.preco || '');
      setIdioma(initialData.idioma || '');
      setFormato(initialData.formato || '');
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!filmeId) newErrors.filmeId = "Filme é obrigatório.";
    if (!salaId) newErrors.salaId = "Sala é obrigatória.";
    if (!dataHora) newErrors.dataHora = "Data e Hora são obrigatórios.";
    const precoNum = Number(preco);
    if (isNaN(precoNum) || precoNum < 0) {
      newErrors.preco = "Preço deve ser um número positivo ou zero.";
    }
    if (!idioma) newErrors.idioma = "Idioma é obrigatório.";
    if (!formato) newErrors.formato = "Formato é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit({
      filmeId,
      salaId,
      dataHora: new Date(dataHora).toISOString(),
      preco: Number(preco),
      idioma,
      formato,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.sessionForm}>
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger mb-3">
          Por favor, corrija os erros indicados.
        </div>
      )}

      {/* Seletor de Filme */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="sessionFilme" className={`${styles.formLabel} form-label`}>Filme</label>
        <select
          id="sessionFilme"
          className={`form-select ${errors.filmeId ? 'is-invalid' : ''}`}
          value={filmeId}
          onChange={(e) => setFilmeId(e.target.value)}
        >
          <option value="">Selecione um filme...</option>
          {availableMovies.map(movie => (
            <option key={movie.id} value={movie.id!}>
              {movie.titulo}
            </option>
          ))}
        </select>
        {errors.filmeId && <div className="invalid-feedback">{errors.filmeId}</div>}
      </div>

      {/* Seletor de Sala */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="sessionSala" className={`${styles.formLabel} form-label`}>Sala</label>
        <select
          id="sessionSala"
          className={`form-select ${errors.salaId ? 'is-invalid' : ''}`}
          value={salaId}
          onChange={(e) => setSalaId(e.target.value)}
        >
          <option value="">Selecione uma sala...</option>
          {availableRooms.map(room => (
            <option key={room.id} value={room.id!}>
              {room.nome} (Capacidade: {room.capacidade}, Tipo: {room.tipo})
            </option>
          ))}
        </select>
        {errors.salaId && <div className="invalid-feedback">{errors.salaId}</div>}
      </div>

      {/* Data e Hora */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="sessionDataHora" className={`${styles.formLabel} form-label`}>Data e Hora</label>
        <input
          type="datetime-local"
          id="sessionDataHora"
          className={`form-control ${errors.dataHora ? 'is-invalid' : ''}`}
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
        />
        {errors.dataHora && <div className="invalid-feedback">{errors.dataHora}</div>}
      </div>

      {/* Preço */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="sessionPreco" className={`${styles.formLabel} form-label`}>Preço (R$)</label>
        <input
          type="number"
          id="sessionPreco"
          className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
          value={preco}
          min="0"
          step="0.01"
          onChange={(e) => setPreco(e.target.value)}
        />
        {errors.preco && <div className="invalid-feedback">{errors.preco}</div>}
      </div>

      {/* Idioma */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="sessionIdioma" className={`${styles.formLabel} form-label`}>Idioma</label>
        <select
          id="sessionIdioma"
          className={`form-select ${errors.idioma ? 'is-invalid' : ''}`}
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
        >
          <option value="">Selecione o idioma...</option>
          <option value="Dublado">Dublado</option>
          <option value="Legendado">Legendado</option>
        </select>
        {errors.idioma && <div className="invalid-feedback">{errors.idioma}</div>}
      </div>

      {/* Formato */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="sessionFormato" className={`${styles.formLabel} form-label`}>Formato</label>
        <select
          id="sessionFormato"
          className={`form-select ${errors.formato ? 'is-invalid' : ''}`}
          value={formato}
          onChange={(e) => setFormato(e.target.value)}
        >
          <option value="">Selecione o formato...</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
        </select>
        {errors.formato && <div className="invalid-feedback">{errors.formato}</div>}
      </div>

      <div className={`${styles.buttonContainer} d-flex justify-content-end gap-2 mt-4`}>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData?.id ? 'Atualizar Sessão' : 'Salvar Sessão'}
        </button>
      </div>
    </form>
  );
};

export default SessionForm;