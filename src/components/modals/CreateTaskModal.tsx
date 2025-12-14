import type { FormEvent, ChangeEvent } from "react";
import type { Status } from "../../types/board";

interface CreateTaskModalProps {
  isOpen: boolean;
  statuses: Status[];
  statusName: string;
  taskName: string;
  onChangeTask: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeStatus: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
}

export function CreateTaskModal({
  isOpen,
  statuses,
  statusName,
  taskName,
  onChangeTask,
  onChangeStatus,
  onSubmit,
  onClose,
}: CreateTaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h2>Cadastrar tarefa</h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={taskName}
            onChange={onChangeTask}
            required
          />

          <input
            list="status-options"
            placeholder="Status da tarefa"
            value={statusName}
            onChange={(e) => onChangeStatus(e.target.value)}
            required
          />

          <datalist id="status-options">
            {statuses.map((status) => (
              <option key={status.id} value={status.name} />
            ))}
          </datalist>

          <div className="modalActions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
