// Em frontend/src/features/rooms/pages/RoomManagementPage.tsx

import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

import { CreateRoomDto, Room } from "../types";
import * as roomService from "../services/room.service";
import RoomCard from "../components/RoomCard";
import RoomForm from "../components/RoomForm";

const RoomManagementPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const roomsData = await roomService.getAllRooms();
      setRooms(roomsData);
    } catch (error) {
      toast.error("Falha ao buscar as salas.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: CreateRoomDto) => {
    setLoading(true);
    try {
      if (selectedRoom) {
        // Editando
        await roomService.updateRoom(selectedRoom.id, data);
        toast.success("Sala atualizada com sucesso!");
      } else {
        // Criando
        await roomService.createRoom(data);
        toast.success("Sala cadastrada com sucesso!");
      }
      fetchRooms(); // Re-busca a lista para refletir as mudanças
      handleCloseModal();
    } catch (error) {
      toast.error(`Falha ao salvar a sala.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta sala?")) {
      setLoading(true);
      try {
        await roomService.deleteRoom(id);
        toast.success("Sala excluída com sucesso!");
        fetchRooms(); // Re-busca a lista
      } catch (error) {
        toast.error("Falha ao excluir a sala.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOpenModal = (room: Room | null = null) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Gerenciamento de Salas</h1>
      <div className="text-center mb-4">
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Cadastrar Nova Sala
        </Button>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      )}

      {!loading && (
        <Row>
          {rooms.map((room) => (
            <Col key={room.id} md={6} lg={4} className="mb-4">
              <RoomCard
                room={room}
                onEdit={() => handleOpenModal(room)}
                onDelete={() => handleDelete(room.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRoom ? "Editar Sala" : "Cadastrar Sala"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomForm
            initialData={selectedRoom}
            onSubmit={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RoomManagementPage;