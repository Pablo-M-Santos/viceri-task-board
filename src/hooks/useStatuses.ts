import { useState } from "react";
import type { Status } from "../types/board";
import { v4 as uuidv4 } from "uuid";
import { normalizeStatusName } from "../utils/normalizeStatusName";

export function useStatuses() {
  const [statuses, setStatuses] = useState<Status[]>([
    { id: "1", name: "A fazer" },
    { id: "2", name: "Impedido" },
    { id: "3", name: "Em desenvolvimento" },
    { id: "4", name: "Em Merge requests" },
    { id: "5", name: "Concluido" },
  ]);

  function getOrCreateStatus(name: string) {
    const normalized = normalizeStatusName(name);

    let status = statuses.find(
      (s) => normalizeStatusName(s.name) === normalized
    );

    if (!status) {
      status = { id: uuidv4(), name: name.trim() };
      setStatuses((prev) => [...prev, status!]);
    }

    return status;
  }

  return {
    statuses,
    getOrCreateStatus,
  };
}
