import "./Board.css";

import { MagnifyingGlass } from "phosphor-react";
import { Card } from "../Card/Card";
import { useTasks } from "../../hooks/useTasks";
import { useStatuses } from "../../hooks/useStatuses";
import { generateColorFromString } from "../../utils/generateColorFromString";
import { useState, type FormEvent, type ChangeEvent } from "react";
import type { Task } from "../../types/board";
import { CreateTaskModal } from "../modals/CreateTaskModal";
import { EditTaskModal } from "../modals/EditTaskModal";
import { TaskDetailModal } from "../modals/TaskDetailModal";
import { DeleteTaskModal } from "../modals/DeleteTaskModal";

export function Content() {
  type ModalType = "create" | "edit" | "delete" | "detail" | null;

  interface ModalState {
    type: ModalType;
    task: Task | null;
  }

  const [modal, setModal] = useState<ModalState>({
    type: null,
    task: null,
  });

  const [statusName, setStatusName] = useState("A fazer");
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState("");
  const { tasks, createTask, updateTask, deleteTask, toggleTask } = useTasks();
  const { statuses, getOrCreateStatus } = useStatuses();

  function openCreateModal() {
    setModal({ type: "create", task: null });
  }

  function openEditModal(task: Task) {
    setTaskForm(task);
    setModal({ type: "edit", task });
  }

  function openDeleteModal(task: Task) {
    setModal({ type: "delete", task });
  }

  function openDetailModal(task: Task) {
    setModal({ type: "detail", task });
  }

  function closeModal() {
    setModal({ type: null, task: null });
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function setTaskForm(task: Task) {
    setNewTask(task.content);
    setStatusName(
      statuses.find((s) => s.id === task.statusId)?.name || "A fazer"
    );
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (!newTask.trim()) {
      alert("Informe o nome da tarefa");
      return;
    }

    if (!statusName.trim()) {
      alert("Informe o status da tarefa");
      return;
    }

    const status = getOrCreateStatus(statusName);

    createTask(newTask, status.id);

    setNewTask("");
    closeModal();
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTask(event.target.value);
  }

  function handleSaveEdit(event: FormEvent) {
    event.preventDefault();

    if (!modal.task) return;

    if (!newTask.trim()) {
      alert("Informe o nome da tarefa");
      return;
    }

    const status = getOrCreateStatus(statusName);

    updateTask(modal.task.id, {
      content: newTask,
      statusId: status.id,
    });

    setNewTask("");
    closeModal();
  }

  function handleToggleTask(id: string) {
    toggleTask(id);
  }

  return (
    <div className="content">
      <form className="form" onSubmit={handleCreateNewTask}>
        <div className="searchWrapper">
          <MagnifyingGlass size={20} weight="bold" className="searchIcon" />
          <input
            type="text"
            className="input"
            placeholder="Pesquisar tarefas..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <button className="button" type="button" onClick={openCreateModal}>
          Criar Tarefa
        </button>
      </form>

      <CreateTaskModal
        isOpen={modal.type === "create"}
        statuses={statuses}
        statusName={statusName}
        taskName={newTask}
        onChangeTask={handleNewTaskChange}
        onChangeStatus={setStatusName}
        onSubmit={handleCreateNewTask}
        onClose={closeModal}
      />

      <EditTaskModal
        isOpen={modal.type === "edit"}
        task={modal.task}
        statuses={statuses}
        taskName={newTask}
        statusName={statusName}
        onChangeTask={setNewTask}
        onChangeStatus={setStatusName}
        onSave={handleSaveEdit}
        onClose={closeModal}
      />

      <TaskDetailModal
        isOpen={modal.type === "detail"}
        task={modal.task}
        statuses={statuses}
        onClose={closeModal}
      />

      <DeleteTaskModal
        isOpen={modal.type === "delete"}
        task={modal.task}
        onConfirm={() => {
          if (!modal.task) return;
          deleteTask(modal.task.id);
          closeModal();
        }}
        onCancel={closeModal}
      />

      <div className="board">
        {statuses.map((status) => {
          const color = generateColorFromString(status.name);

          return (
            <div
              key={status.id}
              className="column"
              style={{ backgroundColor: `rgba(${color}, 0.061)` }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (!draggedTask) return;

                updateTask(draggedTask.id, { statusId: status.id });
                setDraggedTask(null);
              }}
            >
              <div className="columnHeader">
                <h3
                  className="columnTitle"
                  style={{ backgroundColor: `rgba(${color}, 0.350)` }}
                >
                  <span className="statusDot"></span>
                  {status.name.length > 18
                    ? status.name.slice(0, 18) + "..."
                    : status.name}
                </h3>
                <span className="taskCounter">
                  {tasks.filter((t) => t.statusId === status.id).length}
                </span>
              </div>

              <div className="cardsContainer">
                {tasks
                  .filter((task) => task.statusId === status.id)
                  .filter(
                    (task) =>
                      task.content
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      statuses
                        .find((s) => s.id === task.statusId)
                        ?.name.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((task) => (
                    <Card
                      key={task.id}
                      task={task}
                      bgColor={`rgba(${color}, 0.2)`}
                      handleToggleTask={() => handleToggleTask(task.id)}
                      onDragStart={() => setDraggedTask(task)}
                      handleDeleteTask={() => openDeleteModal(task)}
                      handleEditTask={() => openEditModal(task)}
                      onClick={() => openDetailModal(task)}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
