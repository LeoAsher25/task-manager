import {
  IPaginatedResponse,
  ITask,
  ITaskFormData,
  PaginationParam,
} from "src/types";
import axiosInstance from "./axiosInstance";

export const fetchTasks = async (
  filter: number,
  pagination?: PaginationParam
): Promise<IPaginatedResponse<ITask>> => {
  let isCompleted;
  if (filter !== -1) {
    isCompleted = Boolean(filter);
  }
  const response = await axiosInstance.get("/tasks", {
    params: {
      _sort: "-id",
      isCompleted,
      ...pagination,
    },
  });
  return response.data;
};

export const addTask = async (task: ITaskFormData): Promise<ITask> => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: ITaskFormData
): Promise<ITask> => {
  const response = await axiosInstance.patch(`/tasks/${id}`, {
    name: task.name,
  });
  return response.data;
};

export const updateTaskStatus = async (
  id: string,
  isCompleted: boolean
): Promise<ITask> => {
  const response = await axiosInstance.patch(`/tasks/${id}`, {
    isCompleted,
  });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
