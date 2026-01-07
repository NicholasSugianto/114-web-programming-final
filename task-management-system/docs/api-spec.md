# API Specification - Task Management System

Base URL: `http://localhost:5000/api`

## Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Endpoints

### 1. Create Task (CREATE)

**Endpoint**: `POST /api/tasks`

**Description**: Creates a new task

**Request Body**:
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-01-15"
}
```

**Field Validations**:
- `title`: String, required, cannot be empty
- `description`: String, required
- `status`: String, enum ['pending', 'in-progress', 'completed'], default: 'pending'
- `priority`: String, enum ['low', 'medium', 'high'], default: 'medium'
- `dueDate`: Date, required

**Success Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "6789abcd1234567890efghij",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-01-15T00:00:00.000Z",
    "createdAt": "2025-01-01T10:30:00.000Z",
    "updatedAt": "2025-01-01T10:30:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Task title is required"
}
```

---

### 2. Get All Tasks (READ ALL)

**Endpoint**: `GET /api/tasks`

**Description**: Retrieves all tasks, sorted by creation date (newest first)

**Request Body**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6789abcd1234567890efghij",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "priority": "high",
      "dueDate": "2025-01-15T00:00:00.000Z",
      "createdAt": "2025-01-01T10:30:00.000Z",
      "updatedAt": "2025-01-01T10:30:00.000Z"
    },
    {
      "_id": "1234567890abcdefghijklmn",
      "title": "Test application features",
      "description": "Perform thorough testing of all CRUD operations",
      "status": "in-progress",
      "priority": "medium",
      "dueDate": "2025-01-10T00:00:00.000Z",
      "createdAt": "2025-01-01T09:15:00.000Z",
      "updatedAt": "2025-01-01T11:20:00.000Z"
    }
  ]
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Database connection error"
}
```

---

### 3. Get Single Task (READ ONE)

**Endpoint**: `GET /api/tasks/:id`

**Description**: Retrieves a specific task by ID

**URL Parameters**:
- `id`: MongoDB ObjectId of the task

**Example**: `GET /api/tasks/6789abcd1234567890efghij`

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "6789abcd1234567890efghij",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-01-15T00:00:00.000Z",
    "createdAt": "2025-01-01T10:30:00.000Z",
    "updatedAt": "2025-01-01T10:30:00.000Z"
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Invalid task ID format"
}
```

---

### 4. Update Task (UPDATE)

**Endpoint**: `PUT /api/tasks/:id`

**Description**: Updates an existing task

**URL Parameters**:
- `id`: MongoDB ObjectId of the task

**Request Body** (all fields optional):
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "low",
  "dueDate": "2025-01-20"
}
```

**Example**: `PUT /api/tasks/6789abcd1234567890efghij`

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "6789abcd1234567890efghij",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "completed",
    "priority": "low",
    "dueDate": "2025-01-20T00:00:00.000Z",
    "createdAt": "2025-01-01T10:30:00.000Z",
    "updatedAt": "2025-01-01T14:45:00.000Z"
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Invalid status value"
}
```

---

### 5. Delete Task (DELETE)

**Endpoint**: `DELETE /api/tasks/:id`

**Description**: Deletes a task permanently

**URL Parameters**:
- `id`: MongoDB ObjectId of the task

**Request Body**: None

**Example**: `DELETE /api/tasks/6789abcd1234567890efghij`

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Failed to delete task"
}
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE requests |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Invalid input data or validation error |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server or database error |

---

## Testing Examples

### Using cURL

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Testing API",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2025-01-15"
  }'
```

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Get Single Task:**
```bash
curl http://localhost:5000/api/tasks/6789abcd1234567890efghij
```

**Update Task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/6789abcd1234567890efghij \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Delete Task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/6789abcd1234567890efghij
```

---

## Error Handling

The API implements comprehensive error handling:

1. **Validation Errors**: Returns 400 with specific error message
2. **Not Found Errors**: Returns 404 when resource doesn't exist
3. **Database Errors**: Returns 500 with appropriate error message
4. **Malformed IDs**: Returns 500 with "Invalid task ID format"

All errors include a descriptive message to help debugging.

---

## Notes

- All dates are stored and returned in ISO 8601 format
- Task IDs are MongoDB ObjectIds (24 character hex strings)
- The API supports CORS for frontend integration
- Timestamps (createdAt, updatedAt) are automatically managed by MongoDB
- All string fields are trimmed of whitespace
- Empty or whitespace-only titles are rejected