import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm.jsx";
import { TodoList } from "./TodoList.jsx";
import "./styles.css";
// import { useEffect } from "react/index.js";

export default function App() {
  // Below is now in NewTodoForm component
  // const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    //retrieves local storage
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  //Use Effect Hook
  // does not return anything but takes a fx as argument
  // run function every time a value in [todos] array changes
  //this basically stores info in browser local storage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
