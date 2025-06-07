import React, { useState, } from 'react';
import type { Movie } from '../types';
import styles from './MovieForm.module.css'; // <--- IMPORTE O CSS MODULE AQUI

interface MovieFormProps {
  initialData?: Partial<Movie>;
  onSubmit: (movie: Movie) => void;
  onCancel?: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [titulo, setTitulo] = useState(initialData?.titulo || '');
  const [descricao, setDescricao] = useState(initialData?.descricao || '');
  const [genero, setGenero] = useState(initialData?.genero || '');
  const [classificacao, setClassificacao] = useState(initialData?.classificacao || '');
  const [duracao, setDuracao] = useState<number | string>(initialData?.duracao || '');
  const [dataEstreia, setDataEstreia] = useState(initialData?.dataEstreia || '');
  const [posterUrl, setPosterUrl] = useState(initialData?.posterUrl || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ... (sua função validateForm permanece a mesma, mas pode adicionar validação para posterUrl se desejar)
  const validateForm = (): boolean => {
     const newErrors: Record<string, string> = {};
     if (!titulo.trim()) newErrors.titulo = "Título é obrigatório.";
     if (!descricao.trim()) newErrors.descricao = "Descrição é obrigatória.";
     if (!genero) newErrors.genero = "Gênero é obrigatório.";
     if (!classificacao) newErrors.classificacao = "Classificação é obrigatória.";

     const duracaoNum = Number(duracao);
     if (isNaN(duracaoNum) || duracaoNum < 40) {
       newErrors.duracao = "Duração deve ser um número e no mínimo 40 minutos.";
     }
     if (!dataEstreia) {
       newErrors.dataEstreia = "Data de estreia é obrigatória.";
     } else {
       const hoje = new Date().toISOString().split("T")[0];
       if (dataEstreia < hoje) {
         newErrors.dataEstreia = "A data de estreia não pode ser anterior ao dia atual.";
       }
     }
     // Exemplo de validação para posterUrl (opcional)
     // if (posterUrl && !posterUrl.match(/^(\/|https?:\/\/)/i)) {
     //   newErrors.posterUrl = "URL do cartaz inválida. Deve ser um caminho local (ex: /cartazes/img.jpg) ou uma URL http(s).";
     // }

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const movieData: Movie = {
      titulo,
      descricao,
      genero,
      classificacao,
      duracao: Number(duracao),
      dataEstreia,
      posterUrl,
    };
    onSubmit(movieData);
  };

  return (
    // Aplica a classe do CSS Module ao form.
    // Mantemos as classes do Bootstrap para estrutura base.
    <form onSubmit={handleSubmit} className={`${styles.movieForm} bg-white p-4 rounded shadow-sm`}>
      {Object.keys(errors).length > 0 && (
        // Aplica classe do CSS Module para o sumário de erros
        <div className={`${styles.formErrorSummary} alert alert-danger mb-3`}>
          Por favor, corrija os erros indicados.
        </div>
      )}

      {/* Exemplo de como aplicar classes do module a um form group e label */}
      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="titulo" className={`${styles.formLabel} form-label`}>Título</label>
        <input
          type="text"
          // Se você definiu .formControl no seu module.css e quer usá-lo em vez do Bootstrap:
          // className={`${styles.formControl} ${errors.titulo ? 'is-invalid' : ''}`}
          className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
      </div>

      <div className={`${styles.formGroup} mb-3`}>
        <label htmlFor="descricao" className={`${styles.formLabel} form-label`}>Descrição</label>
        <textarea
          className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
          id="descricao"
          rows={2}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        ></textarea>
        {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
      </div>

     {/* Aplique styles.formGroup e styles.formLabel aos outros campos também... */}
     {/* Gênero */}
     <div className={`${styles.formGroup} mb-3`}>
         <label htmlFor="genero" className={`${styles.formLabel} form-label`}>Gênero</label>
         <select
             className={`form-select ${errors.genero ? 'is-invalid' : ''}`}
             id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required>
             <option value="">Selecione...</option>
             <option value="Ação">Ação</option>
             <option value="Aventura">Aventura</option>
             <option value="Comédia">Comédia</option>
             <option value="Drama">Drama</option>
             <option value="Fantasia">Fantasia</option>
             <option value="Terror">Terror</option>
             <option value="Ficção Científica">Ficção Científica</option>
         </select>
         {errors.genero && <div className="invalid-feedback">{errors.genero}</div>}
     </div>

     {/* Classificação */}
     <div className={`${styles.formGroup} mb-3`}>
         <label htmlFor="classificacao" className={`${styles.formLabel} form-label`}>Classificação Indicativa</label>
         <select
             className={`form-select ${errors.classificacao ? 'is-invalid' : ''}`}
             id="classificacao" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} required>
             <option value="">Selecione...</option>
             <option value="Livre">Livre</option>
             <option value="10 anos">10 anos</option>
             <option value="12 anos">12 anos</option>
             <option value="14 anos">14 anos</option>
             <option value="16 anos">16 anos</option>
             <option value="18 anos">18 anos</option>
         </select>
         {errors.classificacao && <div className="invalid-feedback">{errors.classificacao}</div>}
     </div>

     {/* Duração */}
     <div className={`${styles.formGroup} mb-3`}>
         <label htmlFor="duracao" className={`${styles.formLabel} form-label`}>Duração (minutos)</label>
         <input
             type="number" className={`form-control ${errors.duracao ? 'is-invalid' : ''}`}
             id="duracao" value={duracao} onChange={(e) => setDuracao(e.target.value)} min="40" required
         />
         {errors.duracao && <div className="invalid-feedback">{errors.duracao}</div>}
     </div>

     {/* Data de Estreia */}
     <div className={`${styles.formGroup} mb-3`}>
         <label htmlFor="data-estreia" className={`${styles.formLabel} form-label`}>Data de Estreia</label>
         <input
             type="date" className={`form-control ${errors.dataEstreia ? 'is-invalid' : ''}`}
             id="data-estreia" value={dataEstreia} onChange={(e) => setDataEstreia(e.target.value)} required
         />
         {errors.dataEstreia && <div className="invalid-feedback">{errors.dataEstreia}</div>}
     </div>

     {/* URL do Cartaz */}
     <div className={`${styles.formGroup} mb-3`}>
         <label htmlFor="posterUrl" className={`${styles.formLabel} form-label`}>URL do Cartaz (Poster)</label>
         <input
             type="text" className={`form-control ${errors.posterUrl ? 'is-invalid' : ''}`}
             id="posterUrl" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)}
         />
         {errors.posterUrl && <div className="invalid-feedback">{errors.posterUrl}</div>}
     </div>


      <div className={`${styles.buttonContainer} text-end d-flex gap-2 justify-content-end`}>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-success">
          Salvar Filme
        </button>
      </div>
    </form>
  );
};

export default MovieForm;