"use client"

import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ 
  todo 
}: { 
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
      <span className="flex-grow-1">{todo.title}</span>
      <div className="d-flex gap-2">
        <Button 
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          variant="warning"
          size="sm"
        >
          Edit
        </Button>
        <Button 
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}