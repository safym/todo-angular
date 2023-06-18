export type Status = "normal" | "important" | "completed" | null;

export interface Todo {
  id: number;
  title: string;
  status: Status;
}
