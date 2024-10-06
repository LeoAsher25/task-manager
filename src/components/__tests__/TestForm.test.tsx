// src/components/__tests__/TaskForm.test.tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { addTask } from "src/api/taskApis";
import TaskForm from "../TaskForm";

jest.mock("src/api/taskApis", () => ({
  addTask: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

test("renders TaskForm and adds a task", async () => {
  const mockOnTaskAdded = jest.fn();
  (addTask as jest.Mock).mockResolvedValue({
    id: "1",
    name: "New Task",
    isCompleted: false,
  });

  render(<TaskForm onTaskAdded={mockOnTaskAdded} />);

  const input = screen.getByPlaceholderText(/enter a new task/i);
  const button = screen.getByRole("button", { name: /add task/i });

  // Simulate user typing a task
  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(mockOnTaskAdded).toHaveBeenCalledWith({
      id: "1",
      name: "New Task",
      isCompleted: false,
    });
    expect(toast.success).toHaveBeenCalledWith("Add task successfully");
  });
});

test("shows error message when task addition fails", async () => {
  const mockOnTaskAdded = jest.fn();
  (addTask as jest.Mock).mockRejectedValue(new Error("Failed to add task"));

  render(<TaskForm onTaskAdded={mockOnTaskAdded} />);

  const input = screen.getByPlaceholderText(/enter a new task/i);
  const button = screen.getByRole("button", { name: /add task/i });

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Failed to add task");
  });
});
