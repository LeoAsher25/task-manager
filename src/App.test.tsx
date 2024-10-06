// src/__tests__/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the TaskManager component
jest.mock("./components/TaskManager", () => {
  return () => <div>Mocked TaskManager</div>;
});

test("renders App and TaskManager", () => {
  render(<App />);

  // Check if TaskManager is rendered
  const taskManagerElement = screen.getByText(/mocked taskmanager/i);
  expect(taskManagerElement).toBeInTheDocument();
});
