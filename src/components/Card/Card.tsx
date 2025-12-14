import "./Card.css";
import { Trash, PencilSimple } from "phosphor-react";
import type { TaskProps } from "../Board/Board";

interface Task {
  task: TaskProps;
  handleDeleteTask: () => void;
  handleToggleTask: () => void;
  onClick?: () => void;
  bgColor?: string;
  handleEditTask?: () => void;
}

export function Card({
  task,
  handleDeleteTask,
  handleToggleTask,
  onClick,
  bgColor,
  handleEditTask,
}: Task) {
  return (
    <div
      className="card"
      style={{ backgroundColor: bgColor || "var(--gray-400)" }}
      onClick={onClick}
    >
      <label className="container">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={(e) => {
            e.stopPropagation();
            handleToggleTask();
          }}
        />
      </label>

      <p className={task.isCompleted ? "isCompleted" : ""}>{task.content}</p>

      <div className="cardActions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditTask?.();
          }}
        >
          <PencilSimple size={21} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTask();
          }}
        >
          <Trash size={21} />
        </button>
      </div>
    </div>
  );
}
