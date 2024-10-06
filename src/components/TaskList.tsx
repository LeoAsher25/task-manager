import { ITask } from "src/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: ITask[];
  toggleTaskCompletion: (id: string, isCompleted: boolean) => void;
}

const TaskList = ({ tasks, toggleTaskCompletion }: TaskListProps) => {
  return (
    <div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
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
