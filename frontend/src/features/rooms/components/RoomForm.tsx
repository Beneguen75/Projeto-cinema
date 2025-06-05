import React, { useState, useEffect } from 'react';
import type { Room } from '../types';
import styles from './RoomForm.module.css';

interface RoomFormProps {
  initialData?: Partial<Room>;
  onSubmit: (room: Room) => void;
  onCancel?: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [capacidade, setCapacidade] = useState<number | string>(initialData?.capacidade || '');
  const [tipo, setTipo] = useState(initialData?.tipo || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preencher o formulário se initialData mudar (para edição)
  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome || '');
      setCapacidade(initialData.capacidade || '');
      setTipo(initialData.tipo || '');
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!nome.trim()) newErrors.nome = "Nome da sala é obrigatório.";
    const capNum = Number(capacidade);
    if (isNaN(capNum) || capNum <= 0) {
      newErrors.capacidade = "Capacidade deve ser um número positivo.";
    } else if (capNum > 500) { // Limite arbitrário, ajuste se necessário
        newErrors.capacidade = "Capacidade máxima de 500 lugares."
    }
    if (!tipo) newErrors.tipo = "Tipo da sala é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit({
      nome,
      capacidade: Number(capacidade),
      tipo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.roomForm}> {/* Use styles.roomForm do seu CSS Module */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger mb-3"> {/* Pode estilizar com CSS Modules também */}
          Por favor, corrija os erros indicados.
        </div>
      )}

      <div className="mb-3"> {/* Use classes do seu CSS Module aqui, como styles.formGroup */}
        <label htmlFor="nomeSala" className={`${styles.formLabel} form-label`}>Nome da Sala</label>
        <input
          type="text"
          className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
          id="nomeSala"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="capacidadeSala" className="form-label">Capacidade</label>
        <input
          type="number"
          className={`form-control ${errors.capacidade ? 'is-invalid' : ''}`}
          id="capacidadeSala"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
        />
        {errors.capacidade && <div className="invalid-feedback">{errors.capacidade}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="tipoSala" className="form-label">Tipo</label>
        <select
          className={`form-select ${errors.tipo ? 'is-invalid' : ''}`}
          id="tipoSala"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Selecione o tipo</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="IMAX">IMAX</option>
          {/* Adicione outras opções se necessário */}
        </select>
        {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData?.id ? 'Atualizar Sala' : 'Salvar Sala'}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;