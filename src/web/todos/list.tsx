import React from "react";

import { useTodosStore } from "todos/store";
import { observer } from "mobx-react";

export default observer(function TodoList() {
  const todosStore = useTodosStore();

  function renderTodo(todo: ITodo) {
    return (
      <div
        key={todo.id}
        onClick={() => todosStore.toggleDoneStatus(todo)}
        style={todo.done ? { textDecoration: "line-through" } : undefined}
      >
        {todo.text}
      </div>
    );
  }
  return <>{todosStore.list.map(renderTodo)}</>;
});
