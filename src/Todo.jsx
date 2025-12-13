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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          console.error("Failed to fetch todos:", response.status);
          return;
        }

        const data = await response.json();
        setTodos(Array.isArray(data?.data) ? data?.data : []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    if (isAuthenticated) fetchTodos();
  }, [isAuthenticated, accessToken]);




  // ✅ Add new todo
  async function handleAddTodo() {
    if (todo.trim() === "") return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
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

      const data = await response.json();
      const created = data.data
      setTodos((prev) => [created,...prev]);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
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

      const data = await response.json();
      const updated=data.data
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
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

      const data = await response.json();
      const updated = data.data
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  // ✅ Delete todo
  async function handleDeleteTodo(id, completed) {
    if (completed) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
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
    <div className=" bg-black text-white w-screen h-screen flex flex-col ">
     
        <div className="w-full h-20 flex-col border-0  " id="header"> 
             <div className="flex font-bold justify-center h-12 text-4xl "> <h2>Todo List</h2></div>
           <div className=" font-bold flex justify-end pr-5"> <button className="w-20 bg-red-800 rounded-2xl" onClick={handleLogout} >
              Logout
            </button></div>
       </div>

     
       <div  id="todoCreation" className="flex  mt-5 w-full flex-col justify-center pl-5 pr-5 lg:pl-20 lg:pr-20">
                      <input
                        type="text"
                        value={todo}
                        className="w-100% outline-none  "
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="Enter your task..."
                      />
                      <div className="flex justify-end lg:justify-start pr-3">
                        <button className="bg-green-400 w-20 pt-1 rounded " onClick={handleAddTodo}>Add Todo</button>
                      </div>
       </div>
      

     <section className="flex flex-col w-full pl-5 pr-5  lg:pl-20 lg:pr-20 overflow-y-auto " id="wholetodosection ">
                    <ul className="todo-list">
                      {todos.map((t) => (
                            
                                      <li key={t._id} className={t.completed ? "completed" : ""}>
                                                <div className="flex mt-5 h-20 justify-between w-full ">
                                                         <div className="flex flex-col justify-center ">
                                                           <input
                                                          className="w-10 h-5  "
                                                  type="checkbox"
                                                  checked={!!t.completed}
                                                  onChange={() => handleCompleteTodo(t._id, !!t.completed)}
                                                />
                                                         </div>

                                                <input
                                                type="text"
                                                className="lg:flex-1 bg-black outline-none  "
                                                  value={editId === t._id ? editValue : t.title}
                                                  onChange={(e) => setEditValue(e.target.value)}
                                                  readOnly={editId !== t._id || t.completed}
                                                  style={{
                                                    textDecoration: t.completed ? "line-through" : "none",
                                                  
                                                    border: editId === t._id ? "1px solid #aaa" : "none",
                                                  }}
                                                />

                                               <div className="flex flex-col justify-center items-center lg:flex-row ">
                                                
                                                   {editId === t._id ? (
                                                  <div className="flex r  flex-row justify-center w-25" > 
                                                    <button className="lg:w-30 w-20 rounded lg:h-10 border-2 bg-green-500" onClick={() => handleSaveClick(t._id)} disabled={t.completed}>
                                                    Save
                                                  </button></div>
                                                ) : (
                                                 <div className="flex flex-row justify-center w-25" >
                                                  <button
                                                  className="lg:w-30 rounded-xl w-20 lg:h-10 border-2 border-black bg-blue-600"
                                                    onClick={() => handleEditClick(t._id, t.title, t.completed)}
                                                    disabled={t.completed}
                                                  >
                                                    Edit
                                                  </button>
                                                 </div>
                                                )}
                                          

                                               <div className="flex flex-row justify-center w-25">
                                                 <button
                                                className="lg:w-30  w-20 rounded-xl lg:h-10 border-2 bg-purple-400 text-white border-black"
                                                  onClick={() => handleDeleteTodo(t._id, t.completed)}
                                                  disabled={t.completed}
                                                  style={{
                                                    color: t.completed ? "gray" : "red",
                                                    cursor: t.completed ? "not-allowed" : "pointer",
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                               </div>
                                               </div>
                                                </div>
                                              </li>
                                
                      ))}
                    </ul>
     </section>
    </div>
  );
}

export default Todo;
