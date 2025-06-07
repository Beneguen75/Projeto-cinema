import React, { useState, useEffect, useCallback } from 'react';
import type { Movie } from '../types';
import MovieForm from '../components/MovieForm';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';
import stylesPage from './MovieManagementPage.module.css';


// Importa as funções (valores)
import { getAllMovies, createMovie, updateMovie, deleteMovie } from '../services/movie.service';

// Importa os tipos usando "import type"
import type { CreateMovieData } from '../services/movie.service';

const MovieManagementPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined);
  
  // Novos estados para controle de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os filmes da API
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      setError('Falha ao carregar os filmes. Por favor, tente novamente mais tarde.');
      toast.error('Falha ao carregar os filmes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect agora chama a função para buscar dados da API
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleMovieSubmit = async (movieData: CreateMovieData) => {
    try {
      if (editingMovie && editingMovie.id) {
        // Lógica de ATUALIZAÇÃO via API
        await updateMovie(editingMovie.id, movieData);
        toast.success('Filme atualizado com sucesso!');
      } else {
        // Lógica de CRIAÇÃO via API
        await createMovie(movieData);
        toast.success('Filme salvo com sucesso!');
      }
      setShowForm(false);
      setEditingMovie(undefined);
      fetchMovies(); // Re-busca os filmes para atualizar a lista
    } catch (err) {
      toast.error('Erro ao salvar o filme.');
    }
  };

  const handleEditMovie = (movieToEdit: Movie) => {
    setEditingMovie(movieToEdit);
    setShowForm(true);
  };

  const handleDeleteMovie = async (movieId?: string) => {
    if (!movieId) return;
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      try {
        // Lógica de DELEÇÃO via API
        await deleteMovie(movieId);
        toast.info('Filme excluído!');
        fetchMovies(); // Re-busca os filmes para atualizar a lista
      } catch (err) {
        toast.error('Erro ao excluir o filme.');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMovie(undefined);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando filmes...</p>;
    }
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
    if (movies.length === 0 && !showForm) {
      return <p>Nenhum filme cadastrado ainda. Clique em "Cadastrar Novo Filme" para começar.</p>;
    }
    return (
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-6 col-lg-4 mb-4">
            <MovieCard
              movie={movie}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={stylesPage.pageContainer}>
      <div className={stylesPage.pageHeader}>
        <h1 className={stylesPage.pageTitle}>Gerenciador de Filmes</h1>
        {!showForm && (
          <button
            className={`btn btn-primary ${stylesPage.addButton}`}
            onClick={() => { setEditingMovie(undefined); setShowForm(true); }}
          >
            Cadastrar Novo Filme
          </button>
        )}
      </div>

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header">
            {editingMovie ? 'Editar Filme' : 'Cadastrar Novo Filme'}
          </div>
          <div className="card-body">
            <MovieForm
              initialData={editingMovie}
              onSubmit={handleMovieSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      <h2 className="mt-5 mb-3">Filmes Cadastrados</h2>
      {renderContent()}
    </div>
  );
};

export default MovieManagementPage;