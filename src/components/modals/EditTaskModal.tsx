import type { FormEvent } from "react";
import type { Status, Task } from "../../types/board";

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  statuses: Status[];
  taskName: string;
  statusName: string;
  onChangeTask: (value: string) => void;
  onChangeStatus: (value: string) => void;
  onSave: (e: FormEvent) => void;
  onClose: () => void;
}

export function EditTaskModal({
  isOpen,
  task,
  statuses,
  taskName,
  statusName,
  onChangeTask,
  onChangeStatus,
  onSave,
  onClose,
}: EditTaskModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h2>Editar tarefa</h2>

        <form onSubmit={onSave}>
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={taskName}
            onChange={(e) => onChangeTask(e.target.value)}
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
