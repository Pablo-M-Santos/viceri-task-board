import "./Card.css";
import { Trash, PencilSimple } from "phosphor-react";

import type { Task } from "../../types/board";

interface TaskProps {
  task: Task;
  handleDeleteTask: () => void;
  handleToggleTask: () => void;
  onClick?: () => void;
  bgColor?: string;
  handleEditTask?: () => void;
  onDragStart?: () => void;
}

export function Card({
  task,
  handleDeleteTask,
  handleToggleTask,
  onClick,
  bgColor,
  handleEditTask,
  onDragStart,
}: TaskProps) {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onDragStart?.();
      }}
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

      <div className="cardContent">
        <p className={task.isCompleted ? "isCompleted" : ""}>{task.content}</p>
      </div>

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
