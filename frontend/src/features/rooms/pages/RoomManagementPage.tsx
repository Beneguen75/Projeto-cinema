import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './RoomManagementPage.module.css';
import type { CreateRoomDto, Room } from '../types';
import * as roomService from '../../rooms/services/room.service'; 
import RoomCard from '../components/RoomCard';
import RoomForm from '../components/RoomForm';
import { Modal } from '../../../components/modal/modal';

const RoomManagementPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const roomsData = await roomService.getAllRooms(); 
      setRooms(roomsData);
    } catch (error) {
      toast.error('Falha ao buscar as salas.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: CreateRoomDto) => {
    setIsLoading(true);
    try {
      if (selectedRoom) {
        await roomService.updateRoom(selectedRoom.id, data);
        toast.success('Sala atualizada com sucesso!');
      } else {
        await roomService.createRoom(data);
        toast.success('Sala cadastrada com sucesso!');
      }
      fetchRooms();
      handleCloseModal();
    } catch (error) {
      toast.error(`Falha ao salvar a sala.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta sala?')) {
      setIsLoading(true);
      try {
        await roomService.deleteRoom(id);
        toast.success('Sala excluída com sucesso!');
        fetchRooms();
      } catch (error) {
        toast.error('Falha ao excluir a sala.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOpenModal = (room?: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(undefined);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gerenciamento de Salas</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          Cadastrar Nova Sala
        </button>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mt-5 mb-3">Salas Cadastradas</h2>
          <div className="row">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div key={room.id} className="col-md-6 col-lg-4 mb-4">
                  <RoomCard
                    room={room}
                    onEdit={() => handleOpenModal(room)}
                    onDelete={() => handleDelete(room.id)}
                  />
                </div>
              ))
            ) : (
              <p>Nenhuma sala cadastrada. Clique em "Cadastrar Nova Sala" para começar.</p>
            )}
          </div>
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedRoom ? 'Editar Sala' : 'Cadastrar Sala'}
      >
        <RoomForm
          initialData={selectedRoom}
          onSubmit={handleSave}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default RoomManagementPage;