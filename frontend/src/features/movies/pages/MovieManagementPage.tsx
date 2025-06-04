import React, { useState, useEffect } from 'react';
import MovieForm from '../components/MovieForm';
import { Movie } from '../types';

// TEMP: Vamos usar localStorage temporariamente para simular a persistência
// como no seu projeto original, até integrarmos o backend.
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
  const [showForm, setShowForm] = useState(false); // Para controlar visibilidade do form
  // const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined); // Para edição

  // TEMP: Carregar filmes do localStorage ao montar
  useEffect(() => {
    setMovies(getMoviesFromStorage());
  }, []);
  // FIM TEMP

  const handleMovieSubmit = (movieData: Movie) => {
    console.log('Novo filme submetido:', movieData);
    // Lógica para adicionar/editar filme
    // Por enquanto, vamos apenas adicionar à lista e ao localStorage (temporário)
    const newMovie = { ...movieData, id: new Date().toISOString() }; // ID temporário
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    saveMoviesToStorage(updatedMovies); // TEMP

    alert('Filme salvo com sucesso! (Temporariamente)');
    setShowForm(false); // Esconde o formulário após submissão
    // setEditingMovie(undefined);
  };

  // const handleEditMovie = (movie: Movie) => {
  //   setEditingMovie(movie);
  //   setShowForm(true);
  // };

  // const handleDeleteMovie = (movieId: string) => {
  //   if (window.confirm('Tem certeza que deseja excluir este filme?')) {
  //     const updatedMovies = movies.filter(m => m.id !== movieId);
  //     setMovies(updatedMovies);
  //     saveMoviesToStorage(updatedMovies); // TEMP
  //     alert('Filme excluído! (Temporariamente)');
  //   }
  // };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciador de Filmes</h1>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => { /*setEditingMovie(undefined);*/ setShowForm(true); }}>
            Cadastrar Novo Filme
          </button>
        )}
      </div>

      {/* O formulário pode ser um modal ou exibido condicionalmente */}
      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header">
            {/* {editingMovie ? 'Editar Filme' : 'Cadastrar Novo Filme'} */}
            Cadastrar Novo Filme
          </div>
          <div className="card-body">
            <MovieForm
              // initialData={editingMovie} // Para edição
              onSubmit={handleMovieSubmit}
              onCancel={() => { setShowForm(false); /*setEditingMovie(undefined);*/ }}
            />
          </div>
        </div>
      )}

      <h2 className="mt-5 mb-3">Filmes Cadastrados</h2>
      {movies.length === 0 && !showForm && (
        <p>Nenhum filme cadastrado ainda.</p>
      )}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{movie.titulo}</h5>
                <p><strong>Gênero:</strong> {movie.genero}</p>
                <p><strong>Duração:</strong> {movie.duracao} min</p>
                <p><strong>Estreia:</strong> {movie.dataEstreia}</p>
                {/* Botões de Editar/Excluir podem ser adicionados aqui */}
                {/*
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditMovie(movie)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMovie(movie.id!)}>Excluir</button>
                </div>
                */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieManagementPage;