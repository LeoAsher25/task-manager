import { ITask } from "src/types";
import TaskItem from "./TaskItem";
import { Dispatch } from "react";

interface TaskListProps {
  tasks: ITask[];
  toggleTaskCompletion: (id: string, isCompleted: boolean) => void;
  handleUpdate: Dispatch<React.SetStateAction<ITask | null>>;
  handleDelete: (id: string) => void;
}

const TaskList = ({
  tasks,
  toggleTaskCompletion,
  handleUpdate,
  handleDelete,
}: TaskListProps) => {
  return (
    <div>
      <ul className="space-y-2 lg:space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No tasks found. Try adding a new task or changing the filter.
        </p>
      )}
    </div>
  );
};

export default TaskList;
