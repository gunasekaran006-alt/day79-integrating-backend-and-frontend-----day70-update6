// day 78:
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode"; 
import api from "../api/apiInstance";

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  // console.log(decoded);

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "not-started",
  });

  const [editingId, setEditingId] = useState(null);

  // FETCH TASKS
  const fetchTasks = async () => {
    try{

      // day 79
      const response = await api.get("/tasks", {  
        headers: {  
          Authorization: `Bearer ${token}` 
        }
      });
      setTasks(response.data);


    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE TASK
  const handleCreateTask = async (e) => {
    e.preventDefault();

    // day 79
    try{
      await api.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({
        title: "",
        description: "",
        status: "not-started"
      });
      fetchTasks();
    }catch(err){
      console.log(err);
    }
  }
  

  // UPDATE TASK
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try{
      await api.put(`/tasks/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingId(null);

      setFormData({
        title: "",
        description: "",
        status: "not-started"
      });
      fetchTasks();
    }catch(err){
      console.log(err);
    }

  }
  

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try{
      const confirmation = window.confirm("Are you sure to delete this task");
      if(confirmation){
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTasks();
    }else{
      return;
    }
    }catch(err){
      console.log(err);
    }
  }
  

  // EDIT TASK
  const handleEditTask = (task) => {
    setEditingId(task._id);

    setFormData({
      title: task.title,
      description: task.description,
      status: task.status
    });
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
console.log(tasks);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Task Manager</h1>

            <p className="text-sm text-gray-600">
              Welcome back, {decoded?.username}
            </p>
          </div>

          <div>
            <button
              onClick={handleLogout}
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-7xl mx-auto p-6">
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Update Task" : "Create Task"}
          </h2>

          <form
            onSubmit={
              editingId ? handleUpdateTask : handleCreateTask
            }
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

            <textarea
              name="description"
              placeholder="Task description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="not-started">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              {editingId ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        {/* TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    {task.title}
                  </h3>

                  <span className={`text-sm ${
                    task.status === "not-started" ? "bg-blue-200 text-blue-600"
                     : task.status === "in-progress" ? "bg-gray-200 text-gray-600"
                     : task.status === "completed" ? "bg-green-200 text-green-600"
                     : "bg-white" 
                     } font-semibold px-3 py-1 rounded-full`}>
                    {task.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">
                  {task.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="flex-1 bg-yellow-400 text-black py-2 rounded-lg font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 font-semibold">No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;