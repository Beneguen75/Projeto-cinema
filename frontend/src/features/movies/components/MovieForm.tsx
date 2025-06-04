import React, { useState } from 'react';
import { Movie } from '../types'; // Importa a interface que acabamos de criar

// Props que o formulário pode receber (ex: um filme para edição, uma função de submit)
interface MovieFormProps {
  initialData?: Partial<Movie>; // Para preencher o formulário em caso de edição
  onSubmit: (movie: Movie) => void;
  onCancel?: () => void; // Opcional, para um botão de cancelar
}

const MovieForm: React.FC<MovieFormProps> = ({ initialData, onSubmit, onCancel }) => {
  // Estado para cada campo do formulário
  // Usamos Partial<Movie> para permitir que initialData não tenha todos os campos
  const [titulo, setTitulo] = useState(initialData?.titulo || '');
  const [descricao, setDescricao] = useState(initialData?.descricao || '');
  const [genero, setGenero] = useState(initialData?.genero || '');
  const [classificacao, setClassificacao] = useState(initialData?.classificacao || '');
  const [duracao, setDuracao] = useState<number | string>(initialData?.duracao || ''); // Pode ser string no input
  const [dataEstreia, setDataEstreia] = useState(initialData?.dataEstreia || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validação do formulário (baseada no seu script-filmes.js)
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
      // Validação simples de data (pode ser melhorada)
      // A validação original comparava com a data atual,
      // faremos isso ao submeter ou com uma lib de validação.
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o recarregamento da página
    if (!validateForm()) {
      return;
    }

    const movieData: Movie = {
      titulo,
      descricao,
      genero,
      classificacao,
      duracao: Number(duracao), // Converte para número
      dataEstreia,
    };
    onSubmit(movieData); // Chama a função passada por props

    // Limpar formulário (opcional, depende se o form some após submit)
    // setTitulo(''); setDescricao(''); // etc.
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      {/* Mensagens de erro globais do formulário poderiam ir aqui */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger mb-3">
          Por favor, corrija os erros indicados.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">Título</label>
        <input
          type="text"
          className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição</label>
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

      <div className="mb-3">
        <label htmlFor="genero" className="form-label">Gênero</label>
        <select
          className={`form-select ${errors.genero ? 'is-invalid' : ''}`}
          id="genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        >
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

      <div className="mb-3">
        <label htmlFor="classificacao" className="form-label">Classificação Indicativa</label>
        <select
          className={`form-select ${errors.classificacao ? 'is-invalid' : ''}`}
          id="classificacao"
          value={classificacao}
          onChange={(e) => setClassificacao(e.target.value)}
          required
        >
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

      <div className="mb-3">
        <label htmlFor="duracao" className="form-label">Duração (minutos)</label>
        <input
          type="number"
          className={`form-control ${errors.duracao ? 'is-invalid' : ''}`}
          id="duracao"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          min="40"
          required
        />
        {errors.duracao && <div className="invalid-feedback">{errors.duracao}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="data-estreia" className="form-label">Data de Estreia</label>
        <input
          type="date"
          className={`form-control ${errors.dataEstreia ? 'is-invalid' : ''}`}
          id="data-estreia"
          value={dataEstreia}
          onChange={(e) => setDataEstreia(e.target.value)}
          required
        />
        {errors.dataEstreia && <div className="invalid-feedback">{errors.dataEstreia}</div>}
      </div>

      <div className="text-end d-flex gap-2 justify-content-end">
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