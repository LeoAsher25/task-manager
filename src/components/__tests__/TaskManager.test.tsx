// src/components/__tests__/TaskManager.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { fetchTasks } from "src/api/taskApis";
import { IPaginatedResponse } from "src/types";
import TaskManager from "../TaskManager";

jest.mock("src/api/taskApis", () => ({
  fetchTasks: jest.fn(),
}));

test("renders TaskManager and loads tasks", async () => {
  const mockTasks: IPaginatedResponse<any> = {
    data: [{ id: "1", name: "Task 1", isCompleted: false }],
    items: 1,
    pages: 1,
    first: 1,
    next: 1,
    last: 1,
  };
  (fetchTasks as jest.Mock).mockResolvedValue(mockTasks);

  render(<TaskManager />);

  await waitFor(() => {
    const taskName = screen.getByText(/task 1/i);
    expect(taskName).toBeInTheDocument();
  });
});

test("handles error when loading tasks", async () => {
  (fetchTasks as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch tasks")
  );

  render(<TaskManager />);

  await waitFor(() => {
    const errorMessage = screen.getByText(/no tasks found/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
