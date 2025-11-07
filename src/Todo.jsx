import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuth } from "./Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Todo() {
  const { accessToken, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // ✅ Fetch todos when authenticated, else go home
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/todos", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          console.error("Failed to fetch todos:", response.status);
          return;
        }

        const data = await response.json();
        setTodos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    if (isAuthenticated) fetchTodos();
    else navigate("/"); // 🔁 Redirect to home if not logged in
  }, [isAuthenticated, accessToken, navigate]);

  // ✅ Add new todo
  async function handleAddTodo() {
    if (todo.trim() === "") return;

    try {
      const response = await fetch("http://localhost:8000/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title: todo.trim(), completed: false }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Failed to add todo:", err);
        return;
      }

      const created = await response.json();
      setTodos((prev) => [...prev, created]);
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  // ✅ Edit mode
  function handleEditClick(id, currentTitle, completed) {
    if (completed) return;
    setEditId(id);
    setEditValue(currentTitle);
  }

  async function handleSaveClick(id) {
    if (editValue.trim() === "") return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title: editValue.trim() }),
      });

      if (!response.ok) {
        console.error("Failed to update todo:", response.status);
        return;
      }

      const updated = await response.json();
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setEditId(null);
      setEditValue("");
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  }

  // ✅ Toggle complete
  async function handleCompleteTodo(id, currentStatus) {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) {
        console.error("Failed to toggle todo:", response.status);
        return;
      }

      const updated = await response.json();
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  // ✅ Delete todo
  async function handleDeleteTodo(id, completed) {
    if (completed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        console.error("Failed to delete todo:", response.status);
        return;
      }

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  // ✅ Logout → clears todos + goes home
  function handleLogout() {
    setTodos([]); // optional: clear local todos immediately
    logout(); // AuthContext handles redirect to "/"
  }

  return (
    <div className="todo-container">
      <div className="header">
        <h2>Todo List</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="input-section">
        <textarea
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t._id} className={t.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={!!t.completed}
              onChange={() => handleCompleteTodo(t._id, !!t.completed)}
            />

            <input
              type="text"
              value={editId === t._id ? editValue : t.title}
              onChange={(e) => setEditValue(e.target.value)}
              readOnly={editId !== t._id || t.completed}
              style={{
                marginLeft: "10px",
                textDecoration: t.completed ? "line-through" : "none",
                background: editId === t._id ? "#fff" : "transparent",
                border: editId === t._id ? "1px solid #aaa" : "none",
              }}
            />

            {editId === t._id ? (
              <button onClick={() => handleSaveClick(t._id)} disabled={t.completed}>
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(t._id, t.title, t.completed)}
                disabled={t.completed}
              >
                Edit
              </button>
            )}

            <button
              onClick={() => handleDeleteTodo(t._id, t.completed)}
              disabled={t.completed}
              style={{
                marginLeft: "10px",
                color: t.completed ? "gray" : "red",
                cursor: t.completed ? "not-allowed" : "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
