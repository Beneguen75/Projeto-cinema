import React, { useState, useEffect } from 'react';
import type { Session } from '../types';
import type { Movie } from '../../movies/types'; // Para buscar filmes
import type { Room } from '../../rooms/types';   // Para buscar salas
import SessionForm from '../components/SessionForm';
import SessionCard from '../components/SessionCard';
import { toast } from 'react-toastify';
import stylesPage from './SessionManagementPage.module.css'; // Crie este CSS Module depois

// Funções temporárias para localStorage (para Filmes, Salas e Sessões)
const getMoviesFromStorage = (): Movie[] => {
  const storedMovies = localStorage.getItem('movies_react_temp');
  // Verifica se storedMovies não é null antes de fazer o parse
  return storedMovies ? JSON.parse(storedMovies) : [];
};

const getRoomsFromStorage = (): Room[] => {
  const storedRooms = localStorage.getItem('rooms_react_temp');
  // Verifica se storedRooms não é null antes de fazer o parse
  return storedRooms ? JSON.parse(storedRooms) : [];
};

const getSessionsFromStorage = (): Session[] => {
  const storedSessions = localStorage.getItem('sessions_react_temp');
  // Verifica se storedSessions não é null antes de fazer o parse
  return storedSessions ? JSON.parse(storedSessions) : [];
};

const saveSessionsToStorage = (sessions: Session[]) => {
  localStorage.setItem('sessions_react_temp', JSON.stringify(sessions));
};

const SessionManagementPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [availableMovies, setAvailableMovies] = useState<Movie[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | undefined>(undefined);

  // Carregar dados necessários ao montar o componente
  useEffect(() => {
    setAvailableMovies(getMoviesFromStorage());
    setAvailableRooms(getRoomsFromStorage());
    setSessions(getSessionsFromStorage());
  }, []);

  const handleSessionSubmit = (sessionData: Omit<Session, 'id'>) => {
    let updatedSessions: Session[];
    const movie = availableMovies.find(m => m.id === sessionData.filmeId);
    const room = availableRooms.find(r => r.id === sessionData.salaId);

    if (!movie || !room) {
        toast.error("Filme ou Sala selecionado não encontrado!");
        return;
    }

    // Validação simples para sobreposição de horários (pode ser muito mais complexa)
    // Esta validação é básica e considera apenas a mesma sala.
    // Não considera a duração do filme. Para uma validação real, seria necessário
    // calcular o horário de término da sessão e verificar conflitos.
    const isOverlapping = sessions.some(s =>
        s.salaId === sessionData.salaId &&
        s.id !== editingSession?.id && // Ignora a própria sessão se estiver editando
        new Date(s.dataHora).getTime() === new Date(sessionData.dataHora).getTime() 
        // Simplificado: Apenas checa se o horário de início é EXATAMENTE o mesmo na mesma sala.
        // Idealmente: verificar (s.inicio < nova.fim && s.fim > nova.inicio)
    );

    if (isOverlapping) {
        toast.error(`Já existe uma sessão para a sala "${room.nome}" neste mesmo horário.`);
        return;
    }


    if (editingSession && editingSession.id) {
      updatedSessions = sessions.map(session =>
        session.id === editingSession.id ? { ...editingSession, ...sessionData } : session
      );
      toast.success('Sessão atualizada com sucesso!');
    } else {
      const newSession: Session = { 
        ...sessionData, 
        id: new Date().toISOString(), // ID temporário
      };
      updatedSessions = [...sessions, newSession];
      toast.success('Sessão salva com sucesso!');
    }
    setSessions(updatedSessions);
    saveSessionsToStorage(updatedSessions);
    setShowForm(false);
    setEditingSession(undefined);
  };

  const handleEditSession = (sessionToEdit: Session) => {
    setEditingSession(sessionToEdit);
    setShowForm(true);
  };

  const handleDeleteSession = (sessionId?: string) => {
    if (!sessionId) return;
    if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
      const updatedSessions = sessions.filter(session => session.id !== sessionId);
      setSessions(updatedSessions);
      saveSessionsToStorage(updatedSessions);
      toast.info('Sessão excluída!');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSession(undefined);
  };

  return (
    <div className={stylesPage.pageContainer}> {/* Use sua classe de container da página */}
      <div className={stylesPage.pageHeader}> {/* Use sua classe de cabeçalho da página */}
        <h1 className={stylesPage.pageTitle}>Gerenciador de Sessões</h1> {/* Use sua classe de título */}
        {!showForm && (
          <button
            className={`btn btn-primary ${stylesPage.addButton}`} /* Use sua classe de botão */
            onClick={() => { setEditingSession(undefined); setShowForm(true); }}
          >
            Nova Sessão
          </button>
        )}
      </div>

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header">
            {editingSession ? 'Editar Sessão' : 'Cadastrar Nova Sessão'}
          </div>
          <div className="card-body">
            <SessionForm
              initialData={editingSession}
              onSubmit={handleSessionSubmit}
              onCancel={handleCancelForm}
              availableMovies={availableMovies}
              availableRooms={availableRooms}
            />
          </div>
        </div>
      )}

      <h2 className="mt-5 mb-3">Sessões Cadastradas</h2>
      {sessions.length === 0 && !showForm && (
        <p>Nenhuma sessão cadastrada ainda. Clique em "Nova Sessão" para começar.</p>
      )}
      <div className="row">
        {sessions.map((session) => {
          const movie = availableMovies.find(m => m.id === session.filmeId);
          const room = availableRooms.find(r => r.id === session.salaId);
          return (
             // Ajustado para um card por linha em telas pequenas, e dois em médias/grandes
             <div key={session.id} className="col-lg-6 mb-4">
               {/* SUBSTITUA O CARD ANTIGO POR ESTE COMPONENTE: */}
               <SessionCard
                 session={session}
                 movie={movie}
                 room={room}
                 onEdit={handleEditSession}
                 onDelete={handleDeleteSession}
               />
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default SessionManagementPage;