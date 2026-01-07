import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { getTasks, createTask, updateTask, deleteTask } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const data = await getTasks()
      setTasks(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tasks')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData)
      fetchTasks()
      setError(null)
    } catch (err) {
      setError('Failed to create task')
      console.error(err)
    }
  }

  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData)
      fetchTasks()
      setEditingTask(null)
      setError(null)
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id)
        fetchTasks()
        setError(null)
      } catch (err) {
        setError('Failed to delete task')
        console.error(err)
      }
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Task Management System
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              editingTask={editingTask}
              onCancel={handleCancelEdit}
            />
          </div>

          <div>
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App