// ... existing imports ...
import { fireEvent, render, screen } from "@testing-library/react";
import TaskItem from "../TaskItem";

test("renders TaskItem and toggles completion", () => {
  const task = { id: "1", name: "Test Task", isCompleted: false };
  const mockToggleTaskCompletion = jest.fn();
  const mockHandleUpdate = jest.fn();
  const mockHandleDelete = jest.fn();

  render(
    <TaskItem
      task={task}
      toggleTaskCompletion={mockToggleTaskCompletion}
      handleUpdate={mockHandleUpdate}
      handleDelete={mockHandleDelete}
    />
  );

  const checkbox = screen.getByRole("button", { name: /mark as complete/i });
  const taskName = screen.getByText(/test task/i);

  expect(taskName).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();

  // Simulate clicking the checkbox
  fireEvent.click(checkbox);
  expect(mockToggleTaskCompletion).toHaveBeenCalledWith("1", true);
});

test("calls handleUpdate when edit icon is clicked", () => {
  const task = { id: "1", name: "Test Task", isCompleted: false };
  const mockToggleTaskCompletion = jest.fn();
  const mockHandleUpdate = jest.fn();
  const mockHandleDelete = jest.fn();

  render(
    <TaskItem
      task={task}
      toggleTaskCompletion={mockToggleTaskCompletion}
      handleUpdate={mockHandleUpdate}
      handleDelete={mockHandleDelete}
    />
  );

  const editIcon = screen.getByRole("button", { name: /edit task/i });
  fireEvent.click(editIcon);
  expect(mockHandleUpdate).toHaveBeenCalledWith(task);
});

test("calls handleDelete when delete icon is clicked", () => {
  const task = { id: "1", name: "Test Task", isCompleted: false };
  const mockToggleTaskCompletion = jest.fn();
  const mockHandleUpdate = jest.fn();
  const mockHandleDelete = jest.fn();

  render(
    <TaskItem
      task={task}
      toggleTaskCompletion={mockToggleTaskCompletion}
      handleUpdate={mockHandleUpdate}
      handleDelete={mockHandleDelete}
    />
  );

  const deleteIcon = screen.getByRole("button", { name: /delete task/i });
  fireEvent.click(deleteIcon);
  expect(mockHandleDelete).toHaveBeenCalledWith("1");
});
