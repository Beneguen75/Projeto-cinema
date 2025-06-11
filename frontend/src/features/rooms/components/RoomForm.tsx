import { useForm } from "react-hook-form";
import type { CreateRoomDto, Room } from "../types";
import styles from "./RoomForm.module.css";

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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome da Sala
        </label>
        <input
          id="nome"
          type="text"
          className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
          {...register("nome", { required: "Nome é obrigatório" })}
        />
        {errors.nome && (
          <div className="invalid-feedback">{errors.nome.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="capacidade" className="form-label">
          Capacidade
        </label>
        <input
          id="capacidade"
          type="number"
          className={`form-control ${errors.capacidade ? 'is-invalid' : ''}`}
          {...register("capacidade", {
            required: "Capacidade é obrigatória",
            valueAsNumber: true,
            min: { value: 1, message: "Capacidade deve ser maior que 0" },
          })}
        />
        {errors.capacidade && (
          <div className="invalid-feedback">{errors.capacidade.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">
          Tipo
        </label>
        <select
          id="tipo"
          className={`form-select ${errors.tipo ? 'is-invalid' : ''}`}
          {...register("tipo", { required: "Tipo é obrigatório" })}
        >
          <option value="">Selecione o tipo</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="IMAX">IMAX</option>
        </select>
        {errors.tipo && (
          <div className="invalid-feedback">{errors.tipo.message}</div>
        )}
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default RoomForm;