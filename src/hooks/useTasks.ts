import { useEffect, useState } from "react";
import type { Task } from "../types/board";
import { v4 as uuidv4 } from "uuid";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storage = localStorage.getItem("@ToDoList:tasks");
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    localStorage.setItem("@ToDoList:tasks", JSON.stringify(tasks));
  }, [tasks]);

  function createTask(content: string, statusId: string) {
    setTasks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content,
        statusId,
        isCompleted: false,
      },
    ]);
  }

  function updateTask(taskId: string, data: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...data } : task))
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  function toggleTask(taskId: string) {
    updateTask(taskId, {
      isCompleted: !tasks.find((t) => t.id === taskId)?.isCompleted,
    });
  }

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    setTasks, // útil pro drag and drop
  };
}
