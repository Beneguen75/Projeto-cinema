import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import stylesPage from './SessionManagementPage.module.css';
import type { CreateSessionDto, Session } from '../types';
import * as sessionService from '../services/session.service';
import SessionCard from '../components/SessionCard';
import SessionForm from '../components/SessionForm';
import { Modal } from '../../../components/modal/modal';

const SessionManagementPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | undefined>(
    undefined,
  );

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sessionService.getAllSessions();
      setSessions(data);
    } catch (err) {
      setError('Falha ao carregar as sessões. Por favor, tente novamente mais tarde.');
      toast.error('Falha ao carregar as sessões.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleSave = async (data: CreateSessionDto) => {
    try {
      if (selectedSession) {
        await sessionService.updateSession(selectedSession.id, data);
        toast.success('Sessão atualizada com sucesso!');
      } else {
        await sessionService.createSession(data);
        toast.success('Sessão cadastrada com sucesso!');
      }
      setShowModal(false);
      setSelectedSession(undefined);
      fetchSessions();
    } catch (err) {
      toast.error('Erro ao salvar a sessão.');
    }
  };

  const handleDelete = async (sessionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
      try {
        await sessionService.deleteSession(sessionId);
        toast.info('Sessão excluída!');
        fetchSessions();
      } catch (err) {
        toast.error('Erro ao excluir a sessão.');
      }
    }
  };

  const handleOpenModal = (session?: Session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSession(undefined);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando sessões...</p>;
    }
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
    if (sessions.length === 0) {
      return <p>Nenhuma sessão cadastrada. Clique em "Cadastrar Nova Sessão" para começar.</p>;
    }
    return (
      <div className="row">
        {sessions.map((session) => (
          <div key={session.id} className="col-lg-6 mb-4">
            <SessionCard
              session={session}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={stylesPage.pageContainer}>
      <div className={stylesPage.pageHeader}>
        <h1 className={stylesPage.pageTitle}>Gerenciamento de Sessões</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          Cadastrar Nova Sessão
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedSession ? 'Editar Sessão' : 'Cadastrar Sessão'}
      >
        <SessionForm
          initialData={selectedSession}
          onSubmit={handleSave}
          onCancel={handleCloseModal}
        />
      </Modal>

      <h2 className="mt-5 mb-3">Sessões Cadastradas</h2>
      {renderContent()}
    </div>
  );
};

export default SessionManagementPage;