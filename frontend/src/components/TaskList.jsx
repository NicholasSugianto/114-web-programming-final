import TaskItem from './TaskItem'

const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">
        Task List ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
