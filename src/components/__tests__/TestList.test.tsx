// src/components/__tests__/TaskList.test.tsx
import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";
import { ITask } from "src/types";

test("renders TaskList with multiple tasks", () => {
  const tasks = [
    { id: "1", name: "Task 1", isCompleted: false },
    { id: "2", name: "Task 2", isCompleted: true },
  ];
  const mockToggleTaskCompletion = jest.fn();

  render(
    <TaskList tasks={tasks} toggleTaskCompletion={mockToggleTaskCompletion} />
  );

  const task1 = screen.getByText(/task 1/i);
  const task2 = screen.getByText(/task 2/i);

  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();
});

test("shows message when no tasks are found", () => {
  const tasks: ITask[] = [];
  const mockToggleTaskCompletion = jest.fn();

  render(
    <TaskList tasks={tasks} toggleTaskCompletion={mockToggleTaskCompletion} />
  );

  const noTasksMessage = screen.getByText(/no tasks found/i);
  expect(noTasksMessage).toBeInTheDocument();
});
