import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';


function App() {
    const[todo,setTodo]=useState('');
    const[todos,setTodos]=useState([]);
    const[editId,setEditID]=useState(null);
    const[editValue,setEditValue]=useState("");

  
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('http://localhost:8000/todos');
        const data = await response.json();
        setTodos(data); // ✅ directly set the array
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    fetchTodos();
  }, []);





    async function handleAddTodo() {
        try {
             if (todo.trim() === '') return;
            const newTodo = {title : todo,completed:false};
            const response = await fetch("http://localhost:8000/todos",{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(newTodo)
            });
            console.log("Todo Posted")
             const data = await response.json();
             setTodos([...todos,data]); // ✅ directly set the array
            setTodo('')

        } catch (error) {
            console.error("Error sending Data",error)
            
        }
    
        


    }


    function handleEditClick(id,currentTitle){
        setEditID(id);
        setEditValue(currentTitle);
    }




    async function handleSaveClick(id) {
        try { const response = await fetch(`http://localhost:8000/todos/${id}`,{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({title : editValue})
        })
            const updatedTodo = await response.json();
            setTodos(todos.map((t)=>(t._id===id ? updatedTodo:t)));
            setEditID(null);
            setEditValue("");
        } catch (error) {
            console.error('Error Editing Todo :',error)
            
        }
    }

    async function handleCompleteTodo(id,currentStatus) {
        try { const response = await fetch (`http://localhost:8000/todos/${id}`,{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({completed: !currentStatus})
        });
        const updatedTodo =await response.json();
        setTodos(todos.map(t=>(t._id===id ? updatedTodo : t)));
        } catch (error) {
             console.error('Error updating Todo:',error)
        }
        
    }

    async function handleDeleteTodo (id) {
        try{
            const response = await fetch(`http://localhost:8000/todos/${id}`,{
                method:'DELETE'
            });
            setTodos(todos.filter((t)=>(t._id !== id)));
        } catch(error){
            console.error('Error deleting todo:',error)
        }

        
    }



  return (
    <div>
        <textarea
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        ></textarea>
        <button onClick={handleAddTodo}>Add todo</button>

       
         <ul>
          {todos.map((t)=>(  <li key ={t._id}>
                <input
                type="checkbox"
                checked={t.completed}
                onChange={()=>handleCompleteTodo(t._id,t.completed)}
                />
               
                <input
                type="text"
                value={editId === t._id ? editValue : t.title}
                onChange={(e)=>setEditValue(e.target.value)}
                readOnly={editId !== t._id }
                style={{
                    marginLeft:"10px",textDecoration:t.completed?'line-through':'none',
                    background:editId ===t._id ?"#fff": "transparent",
                    border:editId === t._id ? "1px solid #aaa":"none"
                }}
                />  
               {editId === t._id ? ( <button
                onClick={()=>handleSaveClick(t._id)} 
                >Save
                </button>):(
                <button
                onClick={()=>handleEditClick(t._id,t.title)}
                >
                    Edit

                </button>)}
                <button
                onClick={()=>handleDeleteTodo(t._id)}
                style={{marginLeft:'10px',color:'red'}}>
                Delete
                </button>
             
            </li>))}
         </ul>
    
    </div>
  )
}

export default App