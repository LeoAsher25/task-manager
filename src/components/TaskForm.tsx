import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { addTask, updateTask } from "src/api/taskApis";
import { ITask, ITaskFormData } from "src/types";
import { handleError } from "src/utils/handleError";
import { addTaskSchema } from "src/utils/validate/task";

interface TaskFormProps {
  onTaskAdded: () => void;
  selectedTask: ITask | null;
}

const defaultValues: ITaskFormData = {
  name: "",
};

const TaskForm = ({ onTaskAdded, selectedTask }: TaskFormProps) => {
  const formModel = useForm({
    defaultValues,
    reValidateMode: "onChange",
    resolver: yupResolver(addTaskSchema),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const valid = await formModel.trigger();
      if (!valid) return;

      const newTask = { name: formModel.getValues("name"), isCompleted: false };
      if (selectedTask) {
        await updateTask(selectedTask.id, newTask);
        formModel.reset();
        toast.success("Update task successfully");
      } else {
        await addTask(newTask);
        formModel.reset();
        toast.success("Add task successfully");
      }
      onTaskAdded();
    } catch (error) {
      handleError(error as Error);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      formModel.setValue("name", selectedTask.name);
    }
  }, [selectedTask]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="text"
          {...formModel.register("name")}
          placeholder="Enter a new task"
          className="flex-grow px-4 lg:py-3 text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400 min-w-0"
          aria-label="New task input"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-colors duration-300"
          aria-label="Save">
          {selectedTask ? (
            <span className="hidden sm:inline-block"> Save</span>
          ) : (
            <>
              <FaPlus className="inline-block mr-1 mb-1" />
              <span className="hidden sm:inline-block"> Add Task</span>
            </>
          )}
        </button>
      </div>
      <div className="text-red-500">
        {formModel.formState.errors.name?.message}
      </div>
    </form>
  );
};

export default TaskForm;
