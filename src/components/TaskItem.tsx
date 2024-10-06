// ... existing imports ...
import React, { Dispatch } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { ITask } from "src/types";

interface TaskItemProps {
  task: ITask;
  toggleTaskCompletion: (id: string, isCompleted: boolean) => void;
  handleUpdate: Dispatch<React.SetStateAction<ITask | null>>;
  handleDelete: (id: string) => void;
}

const TaskItem = ({
  task,
  toggleTaskCompletion,
  handleUpdate,
  handleDelete,
}: TaskItemProps) => {
  return (
    <li
      key={task.id}
      className={`flex items-center p-3 lg:p-4 rounded-lg ${
        task.isCompleted ? "bg-green-100" : "bg-gray-100"
      } transition-colors duration-300`}>
      <button
        onClick={() => toggleTaskCompletion(task.id, !task.isCompleted)}
        className={`min-w-6 w-6 h-6 mr-4 rounded-full flex items-center justify-center ${
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

      <div className="flex items-center gap-3">
        <button aria-label="Edit task" onClick={() => handleUpdate(task)}>
          <FaEdit className="cursor-pointer text-xl text-indigo-600" />
        </button>
        <button aria-label="Delete task" onClick={() => handleDelete(task.id)}>
          <FaTrash className="cursor-pointer text-xl text-red-500" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
