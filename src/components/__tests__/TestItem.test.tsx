// src/components/__tests__/TaskItem.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import TaskItem from "../TaskItem";

test("renders TaskItem and toggles completion", () => {
  const task = { id: "1", name: "Test Task", isCompleted: false };
  const mockToggleTaskCompletion = jest.fn();

  render(
    <TaskItem task={task} toggleTaskCompletion={mockToggleTaskCompletion} />
  );

  const checkbox = screen.getByRole("button", { name: /mark as complete/i });
  const taskName = screen.getByText(/test task/i);

  expect(taskName).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();

  // Simulate clicking the checkbox
  fireEvent.click(checkbox);
  expect(mockToggleTaskCompletion).toHaveBeenCalledWith("1", true);
});
