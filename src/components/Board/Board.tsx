import "./Board.css";
import { MagnifyingGlass } from "phosphor-react";

import { Card } from "../Card/Card";

import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface StatusProps {
  id: string;
  name: string;
}

export interface TaskProps {
  id: string;
  content: string;
  statusId: string;
  isCompleted: boolean;
}

function normalizeStatusName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Content() {
  const [statuses, setStatuses] = useState<StatusProps[]>([
    { id: "1", name: "A fazer" },
    { id: "2", name: "Impedido" },
    { id: "3", name: "Em desenvolvimento" },
    { id: "4", name: "Em Merge requests" },
    { id: "5", name: "Concluido" },
  ]);

  const [statusName, setStatusName] = useState("A fazer");
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskProps | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    const storageTasks = localStorage.getItem("@ToDoList:tasks");

    if (storageTasks) {
      return JSON.parse(storageTasks);
    }

    return [];
  });
  const [newTask, setNewTask] = useState("");

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

    const normalizedInput = normalizeStatusName(statusName);

    let status = statuses.find(
      (s) => normalizeStatusName(s.name) === normalizedInput
    );

    if (!status) {
      const newStatus: StatusProps = {
        id: uuidv4(),
        name: statusName.trim(),
      };

      setStatuses((prev) => [...prev, newStatus]);
      status = newStatus;
    }

    const newCreatedTask: TaskProps = {
      id: uuidv4(),
      content: newTask,
      statusId: status.id,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newCreatedTask]);
    setNewTask("");
    setIsModalOpen(false);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTask(event.target.value);
  }
  function confirmDeleteTask(task: TaskProps) {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  }

  function openEditModal(task: TaskProps) {
    setTaskToEdit(task);
    setStatusName(statuses.find((s) => s.id === task.statusId)?.name || "");
    setNewTask(task.content);
    setIsEditModalOpen(true);
  }

  function handleConfirmDelete() {
    if (taskToDelete) {
      const filteredTasks = tasks.filter((t) => t.id !== taskToDelete.id);
      setTasks(filteredTasks);
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
    }
  }

  function handleSaveEdit(event: FormEvent) {
    event.preventDefault();
    if (!taskToEdit) return;

    if (!newTask.trim()) {
      alert("Informe o nome da tarefa");
      return;
    }

    const normalizedInput = normalizeStatusName(statusName);
    let status = statuses.find(
      (s) => normalizeStatusName(s.name) === normalizedInput
    );

    if (!status) {
      const newStatus: StatusProps = { id: uuidv4(), name: statusName.trim() };
      setStatuses((prev) => [...prev, newStatus]);
      status = newStatus;
    }

    const updatedTasks = tasks.map((t) =>
      t.id === taskToEdit.id
        ? { ...t, content: newTask, statusId: status.id }
        : t
    );

    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setTaskToEdit(null);
    setNewTask("");
  }

  function generateColorFromString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash >> 0) & 255;
    const g = (hash >> 8) & 255;
    const b = (hash >> 16) & 255;
    return `${r}, ${g}, ${b}`;
  }

  function handleToggleTask(id: string) {
    const updatedTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isCompleted: !task.isCompleted,
          }
        : task
    );

    setTasks(updatedTask);
  }

  useEffect(() => {
    localStorage.setItem("@ToDoList:tasks", JSON.stringify(tasks));
  }, [tasks]);

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

        <button
          className="button"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Criar Tarefa
        </button>
      </form>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Cadastrar tarefa</h2>

            <form onSubmit={handleCreateNewTask}>
              <input
                type="text"
                placeholder="Nome da tarefa"
                value={newTask}
                onChange={handleNewTaskChange}
                required
              />

              <input
                list="status-options"
                placeholder="Status da tarefa"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
                required
              />

              <datalist id="status-options">
                {statuses.map((status) => (
                  <option key={status.id} value={status.name} />
                ))}
              </datalist>

              <div className="modalActions">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedTask && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Detalhes da Tarefa</h2>

            <div className="modalDetailContent">
              <p>
                <strong>Conteúdo:</strong> {selectedTask.content}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {statuses.find((s) => s.id === selectedTask.statusId)?.name}
              </p>
            </div>

            <div className="modalActions">
              <button type="button" onClick={() => setIsDetailModalOpen(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && taskToDelete && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Excluir tarefa</h2>
            <p className="modalDelete">
              Tem certeza que deseja excluir a tarefa{" "}
              <strong>{taskToDelete.content}</strong>?
            </p>

            <div className="modalActions">
              <button type="button" onClick={handleConfirmDelete}>
                Excluir
              </button>
              <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && taskToEdit && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Editar Tarefa</h2>

            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                placeholder="Nome da tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
              />

              <input
                list="status-options"
                placeholder="Status da tarefa"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
                required
              />

              <datalist id="status-options">
                {statuses.map((status) => (
                  <option key={status.id} value={status.name} />
                ))}
              </datalist>

              <div className="modalActions">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="board">
        {statuses.map((status) => {
          const color = generateColorFromString(status.name);

          return (
            <div
              key={status.id}
              className="column"
              style={{ backgroundColor: `rgba(${color}, 0.061)` }}
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
                      handleDeleteTask={() => confirmDeleteTask(task)}
                      handleToggleTask={() => handleToggleTask(task.id)}
                      handleEditTask={() => openEditModal(task)}
                      onClick={() => {
                        setSelectedTask(task);
                        setIsDetailModalOpen(true);
                      }}
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
