const TaskTable = ({ tasks, onEdit, onDelete, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
  };

  const priorityStyles = {
    low: "bg-gray-100 text-gray-700 border-gray-200",
    medium: "bg-orange-100 text-orange-700 border-orange-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const groupedTasks = {
    pending: tasks.filter((t) => t.status === "pending"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    completed: tasks.filter((t) => t.status === "completed"),
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-600 text-lg font-medium">No tasks yet</p>
        <p className="text-gray-500 mt-2">
          Click "New Task" to create your first task
        </p>
      </div>
    );
  }

  const StatusGroup = ({ status, tasks, label, count }) => {
    if (tasks.length === 0) return null;

    const taskText = count === 1 ? "task" : "tasks";

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-2">
          <span
            className={`px-3 py-1 rounded-md text-sm font-semibold border ${statusStyles[status]}`}
          >
            {label}
          </span>
          <span className="text-gray-500 text-sm font-medium">
            {count} {taskText} remain
          </span>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider w-8">
                  #
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                  Priority
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider w-36">
                  Start Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider w-36">
                  Due Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {task.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        priorityStyles[task.priority]
                      }`}
                    >
                      {task.priority === "high" && "🔴"}
                      {task.priority === "medium" && "🟡"}
                      {task.priority === "low" && "🟢"}
                      <span className="ml-1 capitalize">{task.priority}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(task.dueDate)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(task._id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <StatusGroup
        status="pending"
        tasks={groupedTasks.pending}
        label="To Do"
        count={groupedTasks.pending.length}
      />
      <StatusGroup
        status="in-progress"
        tasks={groupedTasks["in-progress"]}
        label="In Progress"
        count={groupedTasks["in-progress"].length}
      />
      <StatusGroup
        status="completed"
        tasks={groupedTasks.completed}
        label="Done"
        count={groupedTasks.completed.length}
      />
    </div>
  );
};

export default TaskTable;
