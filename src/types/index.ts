export interface ITask {
  id: string;
  name: string;
  isCompleted: boolean;
}

export type ITaskFormData = Omit<ITask, "id" | "isCompleted">;

export interface PaginationParam {
  _page: number;
  _per_page: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  items: number;
  pages: number;
  first: number;
  next: number;
  last: number;
}
