import { useEffect, useState } from "react";
import { fetchTasks, updateTaskStatus } from "src/api/taskApis";
import { IPaginatedResponse, ITask, PaginationParam } from "src/types";
import FilterButtons from "./FilterButtons";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { toast } from "react-toastify";
import { handleError } from "src/utils/handleError";
import Pagination from "./Pagination";

const TaskManager = () => {
  const [taskListData, setTaskListData] = useState<IPaginatedResponse<ITask>>({
    data: [],
    items: 0,
    pages: 0,
    first: 1,
    next: 1,
    last: 1,
  });
  const [filter, setFilter] = useState<number>(-1);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState<PaginationParam>({
    _page: 1,
    _per_page: 10,
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchTasks(filter, pagination);
      setTaskListData(response);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter, pagination]);

  const onTaskAdded = async () => {
    await loadTasks();
  };

  const onPageChange = (page: number) => {
    setPagination({
      ...pagination,
      _page: page,
    });
  };
  const onItemsPerPageChange = (itemsPerPage: number) => {
    setPagination({
      ...pagination,
      _per_page: itemsPerPage,
    });
  };

  const toggleTaskCompletion = async (id: string, isCompleted: boolean) => {
    try {
      await updateTaskStatus(id, isCompleted);
      setTaskListData({
        ...taskListData,
        data: taskListData.data.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ),
      });
      toast.success("Update task status successfully");
      await loadTasks();
    } catch (error) {
      handleError(error as Error);
    }
    await fetchTasks(filter, pagination);
  };

  return (
    <div className="max-w-4xl mx-auto lg:my-6 p-4 lg:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Task Manager
      </h1>
      <TaskForm onTaskAdded={onTaskAdded} />
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <TaskList
          tasks={taskListData.data}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      )}

      <div className="mt-6">
        <Pagination
          totalItems={taskListData.items}
          itemsPerPage={pagination._per_page}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default TaskManager;
