import React from "react";
import { useLocalStore, observer } from "mobx-react";

import { useTodosStore } from "todos/store";

export default observer(function TodoCreator() {
  const todosStore = useTodosStore();

  const todo = useLocalStore(() => ({
    id: String(new Date().valueOf()),
    text: "",
    reset: () => {
      todo.id = String(new Date().valueOf());
      todo.text = "";
    }
  }));

  return (
    <>
      <h1>Create todo</h1>
      <input
        value={todo.text}
        onChange={e => (todo.text = e.target.value)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            todosStore.addTodo({
              id: todo.id,
              text: todo.text,
              done: false
            });
            todo.reset();
          }
        }}
        placeholder={"todo"}
      />
    </>
  );
});
