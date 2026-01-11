# Task Management System

A full-stack web application for managing tasks with complete CRUD functionality.

## 📋 Project Overview

**Theme**: Task Management System  
**Purpose**: Allow users to create, read, update, and delete tasks with different priorities and statuses.

### Key Features
- ✅ Create new tasks with title, description, priority, and due date
- 📖 View all tasks in a organized list
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- 🎨 Clean and responsive user interface
- ⚡ Real-time data updates

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: CORS, Express JSON parser

### Why These Technologies?
- **React**: Component-based architecture makes code reusable and maintainable
- **Express**: Lightweight and flexible for building RESTful APIs
- **MongoDB**: NoSQL database perfect for flexible data structures
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## 🏗️ System Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │ ◄─────► │   Backend   │ ◄─────► │   MongoDB   │
│   (React)   │  HTTP   │  (Express)  │  CRUD   │  Database   │
│  Port 5173  │         │  Port 5000  │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
```

### Data Flow
1. User interacts with React frontend
2. Frontend sends HTTP requests to Express API
3. Express processes requests and communicates with MongoDB
4. MongoDB performs CRUD operations
5. Response flows back through Express to React
6. UI updates to reflect changes

## 📦 Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- Git

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd task-management-system
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
```

**For MongoDB Atlas**, replace with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### Step 5: Open in Browser
Navigate to http://localhost:5173

## 📁 Project Structure

```
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js  # Business logic
│   ├── models/
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx   # Form component
│   │   │   ├── TaskList.jsx   # List component
│   │   │   └── TaskItem.jsx   # Item component
│   │   ├── services/
│   │   │   └── api.js         # API calls
│   │   ├── App.jsx            # Main component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Styles
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── docs/
│   ├── api-spec.md            # API documentation
│   ├── architecture.png       # System diagram
│   └── flowchart.png          # CRUD flow
│
├── README.md
└── .gitignore
```

## 🧪 Testing the Application

### Manual Testing
1. **Create**: Fill the form and click "Create Task"
2. **Read**: View all tasks in the list
3. **Update**: Click "Edit" on a task, modify, and submit
4. **Delete**: Click "Delete" and confirm

### API Testing (Postman/Thunder Client)
See `docs/api-spec.md` for detailed API endpoints

## 📝 Database Schema

### Task Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🎯 Key Features Implemented

### CRUD Operations
- ✅ **Create**: POST /api/tasks
- ✅ **Read All**: GET /api/tasks
- ✅ **Read One**: GET /api/tasks/:id
- ✅ **Update**: PUT /api/tasks/:id
- ✅ **Delete**: DELETE /api/tasks/:id

### Frontend Features
- Form validation
- Error handling and user feedback
- Responsive design for mobile and desktop
- Loading states
- Confirmation dialogs
- Real-time UI updates

### Backend Features
- RESTful API design
- Consistent response format
- Error handling
- Input validation
- CORS enabled
- Environment configuration

## 🔧 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify .env file exists and has correct values
- Ensure port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in server.js
- Inspect browser console for errors

### Database connection issues
- Check MongoDB is running: `mongod` command
- Verify connection string in .env
- For Atlas: check IP whitelist and credentials

## 📊 Grading Criteria Checklist

- ✅ Complete CRUD functionality
- ✅ Frontend with React and Tailwind CSS
- ✅ Backend with Express and proper structure
- ✅ MongoDB database integration
- ✅ Consistent API response format
- ✅ Error handling
- ✅ Git version control with 5+ commits
- ✅ Complete documentation
- ✅ README with installation instructions
- ✅ API specification document
- ✅ Architecture diagram
- ✅ Demo video

## 👨‍💻 Author

**林皓天**  
Student ID: 412636069
Course: Web Programming Design Final Project

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- Express.js documentation
- React documentation
- MongoDB documentation
- Tailwind CSS documentation