import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { CreateRoomDto } from "../types";
import type { Room } from "../types";

interface RoomFormProps {
  initialData?: Partial<Room>;
  onSubmit: (data: CreateRoomDto) => void;
  onCancel: () => void;
}

const RoomForm = ({ initialData, onSubmit, onCancel }: RoomFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomDto>({
    defaultValues: {
      nome: initialData?.nome || "",
      capacidade: initialData?.capacidade || 0,
      tipo: initialData?.tipo || "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="nome">
        <Form.Label>Nome da Sala</Form.Label>
        <Form.Control
          type="text"
          {...register("nome", { required: "Nome é obrigatório" })}
          isInvalid={!!errors.nome}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nome?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="capacidade">
        <Form.Label>Capacidade</Form.Label>
        <Form.Control
          type="number"
          {...register("capacidade", { 
            required: "Capacidade é obrigatória",
            valueAsNumber: true,
            min: { value: 1, message: "Capacidade deve ser maior que 0" }
          })}
          isInvalid={!!errors.capacidade}
        />
        <Form.Control.Feedback type="invalid">
          {errors.capacidade?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Select
          {...register("tipo", { required: "Tipo é obrigatório" })}
          isInvalid={!!errors.tipo}
        >
          <option value="">Selecione o tipo</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="IMAX">IMAX</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.tipo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </Form>
  );
};

export default RoomForm;