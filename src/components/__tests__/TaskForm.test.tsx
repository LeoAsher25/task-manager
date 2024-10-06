// src/components/__tests__/TaskForm.test.tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { updateTask } from "src/api/taskApis";
import TaskForm from "../TaskForm";

jest.mock("src/api/taskApis", () => ({
  updateTask: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

test("renders TaskForm and updates a task", async () => {
  const mockOnTaskAdded = jest.fn();
  const selectedTask = { id: "1", name: "Existing Task", isCompleted: false };
  (updateTask as jest.Mock).mockResolvedValue(selectedTask);

  render(
    <TaskForm onTaskAdded={mockOnTaskAdded} selectedTask={selectedTask} />
  );

  const input = screen.getByPlaceholderText(/enter a new task/i);
  const button = screen.getByRole("button", { name: /save/i });

  // Simulate user typing a task
  fireEvent.change(input, { target: { value: "Updated Task" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(mockOnTaskAdded).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Update task successfully");
  });
});

test("shows error message when task update fails", async () => {
  const mockOnTaskAdded = jest.fn();
  const selectedTask = { id: "1", name: "Existing Task", isCompleted: false };
  (updateTask as jest.Mock).mockRejectedValue(
    new Error("Failed to update task")
  );

  render(
    <TaskForm onTaskAdded={mockOnTaskAdded} selectedTask={selectedTask} />
  );

  const input = screen.getByPlaceholderText(/enter a new task/i);
  const button = screen.getByRole("button", { name: /save/i });

  fireEvent.change(input, { target: { value: "Updated Task" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Failed to update task");
  });
});
