// src/components/TodoList.tsx
import React, { useState } from 'react';

interface Todo {
  text: string;
  complete: boolean;
}

const initialTodos: Todo[] = [
  { text: 'Walk the dog', complete: false },
  { text: 'Write app', complete: true },
];

function IndexList() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.text}
            onClick={() => toggleTodo(todo)}
            style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexList;
