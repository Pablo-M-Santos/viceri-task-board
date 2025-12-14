import type { Task } from "../../types/board";

interface DeleteTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteTaskModal({
  isOpen,
  task,
  onConfirm,
  onCancel,
}: DeleteTaskModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h2>Excluir tarefa</h2>

        <p className="modalDelete">
          Tem certeza que deseja excluir a tarefa{" "}
          <strong>{task.content}</strong>?
        </p>

        <div className="modalActions">
          <button type="button" onClick={onConfirm}>
            Excluir
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
