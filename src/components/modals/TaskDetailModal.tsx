import type { Status, Task } from "../../types/board";

interface TaskDetailModalProps {
  isOpen: boolean;
  task: Task | null;
  statuses: Status[];
  onClose: () => void;
}

export function TaskDetailModal({
  isOpen,
  task,
  statuses,
  onClose,
}: TaskDetailModalProps) {
  if (!isOpen || !task) return null;

  const statusName =
    statuses.find((s) => s.id === task.statusId)?.name ?? "Sem status";

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h2>Detalhes da tarefa</h2>

        <div className="modalDetailContent">
          <p>
            <strong>Conteúdo:</strong> {task.content}
          </p>
          <p>
            <strong>Status:</strong> {statusName}
          </p>
        </div>

        <div className="modalActions">
          <button type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
