"use client"

import React, { useState } from "react";
import { Form } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      
      <h4>Retrieving Arrays</h4>
      <a 
        id="wd-retrieve-todos" 
        className="btn btn-primary" 
        href={API}
      >
        Get Todos
      </a>
      <hr/>
      
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex align-items-center">
        <Form.Control 
          id="wd-todo-id" 
          value={todo.id} 
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
        />
        <a 
          id="wd-retrieve-todo-by-id" 
          className="btn btn-primary" 
          href={`${API}/${todo.id}`}
        >
          Get Todo by ID
        </a>
      </div>
      <hr />
      
      <h4>Filtering Array Items</h4>
      <a 
        id="wd-retrieve-completed-todos" 
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr/>
      
      <h4>Creating new Items in an Array</h4>
      <a 
        id="wd-create-todo" 
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr/>
      
      <h4>Removing from an Array</h4>
      <div className="d-flex align-items-center">
        <Form.Control 
          value={todo.id} 
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a 
          id="wd-remove-todo" 
          className="btn btn-primary" 
          href={`${API}/${todo.id}/delete`}
        >
          Remove Todo with ID = {todo.id}
        </a>
      </div>
      <hr/>
      
      <h4>Updating an Item in an Array</h4>
      
      {/* Update Title */}
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          value={todo.id} 
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          placeholder="ID"
        />
        <Form.Control 
          value={todo.title} 
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="Title"
        />
        <a 
          href={`${API}/${todo.id}/title/${todo.title}`} 
          className="btn btn-primary"
        >
          Update Title
        </a>
      </div>
      
      {/* Update Description */}
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          value={todo.id} 
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          placeholder="ID"
        />
        <Form.Control 
          value={todo.description} 
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          placeholder="Description"
        />
        <a 
          href={`${API}/${todo.id}/description/${todo.description}`} 
          className="btn btn-primary"
          id="wd-update-todo-description"
        >
          Update Description
        </a>
      </div>
      
      {/* Update Completed */}
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          value={todo.id} 
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          placeholder="ID"
        />
        <Form.Check 
          type="checkbox"
          className="flex-grow-1 me-2"
          checked={todo.completed} 
          onChange={(e) =>
            setTodo({ ...todo, completed: e.target.checked })
          }
          label="Completed"
          id="wd-todo-completed"
        />
        <a 
          href={`${API}/${todo.id}/completed/${todo.completed}`} 
          className="btn btn-primary"
          id="wd-update-todo-completed"
        >
          Update Completed
        </a>
      </div>
      <hr/>
    </div>
  );
}