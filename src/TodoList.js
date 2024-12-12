import React from "react";

// Component con hiển thị task
const TodoList = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <span onClick={() => toggleTask(index)}>{task.description}</span>
          <button onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
