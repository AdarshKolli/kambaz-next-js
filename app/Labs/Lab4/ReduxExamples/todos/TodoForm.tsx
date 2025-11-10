"use client"

import React from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  
  return (
    <ListGroup.Item className="d-flex align-items-center gap-2 p-3">
      <Form.Control 
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo title"
        className="flex-grow-1"
      />
      <Button 
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        variant="success"
      >
        Add
      </Button>
      <Button 
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        variant="primary"
      >
        Update
      </Button>
    </ListGroup.Item>
  );
}