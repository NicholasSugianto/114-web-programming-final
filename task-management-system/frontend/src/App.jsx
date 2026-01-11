import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      fetchTasks();
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      fetchTasks();
      setIsModalOpen(false);
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        fetchTasks();
        setError(null);
      } catch (err) {
        setError("Failed to delete task");
        console.error(err);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Task Management System
            </h1>
            <button
              onClick={handleOpenCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <TaskTable
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
          loading={loading}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}

export default App;
