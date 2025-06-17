import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import stylesPage from './MovieManagementPage.module.css';
import { Modal } from '../../../components/modal/modal';

import type { Movie } from '../types';
import MovieForm from '../components/MovieForm';
import MovieCard from '../components/MovieCard';
import { getAllMovies, createMovie, updateMovie, deleteMovie } from '../services/movie.service';
import type { CreateMovieData } from '../services/movie.service';

const MovieManagementPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showModal, setShowModal] = useState(false); 
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleMovieSubmit = async (movieData: CreateMovieData) => {
    try {
      if (editingMovie && editingMovie.id) {
        await updateMovie(editingMovie.id, movieData);
        toast.success('Filme atualizado com sucesso!');
      } else {
        await createMovie(movieData);
        toast.success('Filme salvo com sucesso!');
      }
      handleCloseModal(); 
      fetchMovies();
    } catch (err) {
      toast.error('Erro ao salvar o filme.');
    }
  };

  const handleDeleteMovie = async (movieId?: string) => {
    if (!movieId) return;
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      try {
        await deleteMovie(movieId);
        toast.info('Filme excluído!');
        fetchMovies();
      } catch (err) {
        toast.error('Erro ao excluir o filme.');
      }
    }
  };

  const handleOpenModal = (movieToEdit?: Movie) => {
    setEditingMovie(movieToEdit);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMovie(undefined);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando filmes...</p>;
    }
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
    if (movies.length === 0) {
      return <p>Nenhum filme cadastrado ainda. Clique em "Cadastrar Novo Filme" para começar.</p>;
    }
    return (
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-6 col-lg-4 mb-4">
            <MovieCard
              movie={movie}
              onEdit={handleOpenModal} 
              onDelete={handleDeleteMovie}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={stylesPage.pageContainer}>
      <div className={stylesPage.pageHeader}>
        <h1 className={stylesPage.pageTitle}>Gerenciador de Filmes</h1>
        <button
          className={`btn btn-primary ${stylesPage.addButton}`}
          onClick={() => handleOpenModal()}
        >
          Cadastrar Novo Filme
        </button>
      </div>
      
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingMovie ? 'Editar Filme' : 'Cadastrar Novo Filme'}
      >
        <MovieForm
          initialData={editingMovie}
          onSubmit={handleMovieSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      <h2 className="mt-5 mb-3">Filmes Cadastrados</h2>
      {renderContent()}
    </div>
  );
};

export default MovieManagementPage;