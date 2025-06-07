import React, { useState, useEffect } from 'react';
import type { Room } from '../types';
import RoomForm from '../components/RoomForm';
// Para os cards das salas, podemos criar um RoomCard.tsx depois, ou fazer um card simples aqui
// import RoomCard from '../components/RoomCard'; 
import { toast } from 'react-toastify';
// Se quiser estilizar esta página de forma similar à de filmes, importe o CSS Module
import stylesPage from './RoomManagementPage.module.css'; // Crie este arquivo depois
import RoomCard from '../components/RoomCard';

// Funções temporárias para localStorage
const getRoomsFromStorage = (): Room[] => {
  const storedRooms = localStorage.getItem('rooms_react_temp');
  return storedRooms ? JSON.parse(storedRooms) : [];
};

const saveRoomsToStorage = (rooms: Room[]) => {
  localStorage.setItem('rooms_react_temp', JSON.stringify(rooms));
};

const RoomManagementPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    setRooms(getRoomsFromStorage());
  }, []);

  const handleRoomSubmit = (roomData: Room) => {
    let updatedRooms: Room[];
    if (editingRoom && editingRoom.id) {
      updatedRooms = rooms.map(room =>
        room.id === editingRoom.id ? { ...editingRoom, ...roomData } : room
      );
      toast.success('Sala atualizada com sucesso!');
    } else {
      const newRoom = { ...roomData, id: new Date().toISOString() }; // ID temporário
      updatedRooms = [...rooms, newRoom];
      toast.success('Sala salva com sucesso!');
    }
    setRooms(updatedRooms);
    saveRoomsToStorage(updatedRooms);
    setShowForm(false);
    setEditingRoom(undefined);
  };

  const handleEditRoom = (roomToEdit: Room) => {
    setEditingRoom(roomToEdit);
    setShowForm(true);
  };

  const handleDeleteRoom = (roomId?: string) => {
    if (!roomId) return;
    if (window.confirm('Tem certeza que deseja excluir esta sala?')) {
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      setRooms(updatedRooms);
      saveRoomsToStorage(updatedRooms);
      toast.info('Sala excluída!');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRoom(undefined);
  };

  return (
    <div className={stylesPage.pageContainer}> {/* <--- Adiciona o wrapper aqui */}
      <div className={stylesPage.pageHeader}>
        <h1 className={stylesPage.pageTitle}>Gerenciador de Salas</h1>
        {!showForm && (
          <button
            className={`btn btn-primary ${stylesPage.addButton}`}
            onClick={() => { setEditingRoom(undefined); setShowForm(true); }}
          >
            Nova Sala
          </button>
        )}
      </div>

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header">
            {editingRoom ? 'Editar Sala' : 'Cadastrar Nova Sala'}
          </div>
          <div className="card-body">
            <RoomForm
              initialData={editingRoom}
              onSubmit={handleRoomSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      <h2 className="mt-5 mb-3">Salas Cadastradas</h2>
      {rooms.length === 0 && !showForm && (
        <p>Nenhuma sala cadastrada ainda. Clique em "Nova Sala" para começar.</p>
      )}
      <div className="row">
        {rooms.map((room) => (
          <div key={room.id || room.nome} className="col-md-6 col-lg-4 mb-4">
            <RoomCard
               room={room}
               onEdit={handleEditRoom}
               onDelete={handleDeleteRoom}
             />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManagementPage;