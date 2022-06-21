import React from "react";
import "./App.css";
import { useState } from "react"
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span> &nbsp;
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>&nbsp;
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>&nbsp;
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add a new todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="type something.."/>&nbsp;
    </Form.Group>
    <Button variant="primary mb-3" type="submit">Submit</Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "This is a sample todo",
      isDone: false
    }
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Simple Todo List</h1>
        <FormTodo addTodo={addTodo}/>
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
               <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;