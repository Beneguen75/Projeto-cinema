import React, { useState, useEffect } from 'react';
import MovieForm from '../components/MovieForm';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types';
import { toast } from 'react-toastify';
import stylesPage from './MovieManagementPage.module.css';

// TEMP: Funções para localStorage (simulando persistência)
const getMoviesFromStorage = (): Movie[] => {
  const storedMovies = localStorage.getItem('movies_react_temp');
  return storedMovies ? JSON.parse(storedMovies) : [];
};

const saveMoviesToStorage = (movies: Movie[]) => {
  localStorage.setItem('movies_react_temp', JSON.stringify(movies));
};
// FIM TEMP

const MovieManagementPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    setMovies(getMoviesFromStorage());
  }, []);

  const handleMovieSubmit = (movieData: Movie) => {
    let updatedMovies: Movie[];
    if (editingMovie && editingMovie.id) {
      updatedMovies = movies.map(movie =>
        movie.id === editingMovie.id ? { ...editingMovie, ...movieData } : movie // Garante que o ID seja mantido ao editar
      );
      toast.success('Filme atualizado com sucesso!');
    } else {
      const newMovie = { ...movieData, id: new Date().toISOString() };
      updatedMovies = [...movies, newMovie];
      toast.success('Filme salvo com sucesso!');
    }
    setMovies(updatedMovies);
    saveMoviesToStorage(updatedMovies);
    setShowForm(false);
    setEditingMovie(undefined);
  };

  const handleEditMovie = (movieToEdit: Movie) => {
    setEditingMovie(movieToEdit);
    setShowForm(true);
  };

  const handleDeleteMovie = (movieId?: string) => {
    if (!movieId) return;
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      const updatedMovies = movies.filter(movie => movie.id !== movieId);
      setMovies(updatedMovies);
      saveMoviesToStorage(updatedMovies);
      toast.info('Filme excluído!');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMovie(undefined);
  };

  return (
    <div className={stylesPage.pageContainer}> {/* <--- Aplicar .pageContainer */}
      <div className={stylesPage.pageHeader}> {/* <--- Aplicar .pageHeader */}
        <h1 className={stylesPage.pageTitle}>Gerenciador de Filmes</h1> {/* <--- Aplicar .pageTitle */}
        {!showForm && (
            <button
              className={`btn btn-primary ${stylesPage.addButton}`}
              onClick={() => {
                setEditingMovie(undefined);
                setShowForm(true);
              }}
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
      {movies.length === 0 && !showForm && (
        <p>Nenhum filme cadastrado ainda. Clique em "Cadastrar Novo Filme" para começar.</p>
      )}
      <div className="row">
        {movies.map((movie) => (
          // Use a classe col-md-6 col-lg-4 do Bootstrap para layout em grade
          <div key={movie.id || movie.titulo} className="col-md-6 col-lg-4 mb-4">
            {/* SUBSTITUA O CÓDIGO DO CARD ANTIGO POR ISTO: */}
            <MovieCard
              movie={movie}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieManagementPage;