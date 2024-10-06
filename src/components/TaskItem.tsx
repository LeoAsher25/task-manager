// src/components/TaskItem.tsx
import React from "react";
import { FaCheck } from "react-icons/fa";
import { ITask } from "src/types";

interface TaskItemProps {
  task: ITask;
  toggleTaskCompletion: (id: string, isCompleted: boolean) => void;
}

const TaskItem = ({ task, toggleTaskCompletion }: TaskItemProps) => {
  return (
    <li
      key={task.id}
      className={`flex items-center p-3 lg:p-4 rounded-lg ${
        task.isCompleted ? "bg-green-100" : "bg-gray-100"
      } transition-colors duration-300`}>
      <button
        onClick={() => toggleTaskCompletion(task.id, !task.isCompleted)}
        className={`w-6 h-6 mr-4 rounded-full flex items-center justify-center ${
          task.isCompleted
            ? "bg-green-500 text-white"
            : "bg-white border-2 border-gray-400"
        } focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300`}
        aria-label={
          task.isCompleted ? "Mark as incomplete" : "Mark as complete"
        }>
        {task.isCompleted && <FaCheck className="text-sm" />}
      </button>
      <span
        className={`flex-grow text-lg ${
          task.isCompleted ? "line-through text-gray-500" : "text-gray-700"
        }`}>
        {task.name}
      </span>
      {task.isCompleted && (
        <FaCheck className="text-green-500 ml-2" aria-label="Completed" />
      )}
    </li>
  );
};

export default TaskItem;
