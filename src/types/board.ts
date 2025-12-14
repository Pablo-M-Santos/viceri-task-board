export interface Status {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  content: string;
  statusId: string;
  isCompleted: boolean;
}
