const TaskItem = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-3">{task.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
