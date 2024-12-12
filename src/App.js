import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

// Component chính của ứng dụng
const App = () => {
  // Khai báo state
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Lấy danh sách task từ API
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (response.ok) {
        const data = await response.json();
        const filteredTasks = data.filter(task => task.action_name === 'add item' && !data.some(t => t.action_name === 'delete item' && t.description === task.description));
        setTasks(filteredTasks); // Cập nhật state với dữ liệu lấy từ API
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Gọi fetchTasks khi component mount
  useEffect(() => {
    fetchTasks();
  }, []); // [] để chỉ gọi 1 lần khi component được render lần đầu tiên

  // Hàm thêm task
  const addTask = async () => {
    if (task.trim()) {
      try {
        await fetch('http://localhost:5000/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: task }),
        });

        // Sau khi thêm task, gọi lại API để lấy danh sách mới
        fetchTasks();
        setTask("");  // reset input
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Hàm xóa task
  const deleteTask = async (index) => {
    const taskToDelete = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: taskToDelete.description }),
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  // Hàm toggle trạng thái hoàn thành của task
  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  // Giao diện
  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <TodoList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </div>
  );
};

export default App;
