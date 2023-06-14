export type Status = "normal" | "important" | "completed";

export interface Todo {
  id: number;
  title: string;
  status: Status;
}
