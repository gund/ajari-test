export interface TodoItem {
  id?: number;
  name: string;
  done: boolean;
}

export type Optional<T> = {
  [P in keyof T]?: T[P];
};
