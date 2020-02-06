import React from "react";
import { observer } from "mobx-react";

import { useUsersStore } from "users/store";
import { useTodosStore } from "todos/store";

function UsersList() {
  const usersStore = useUsersStore();
  const todosStore = useTodosStore();

  return (
    <>
      {usersStore.list.map(user => {
        return (
          <div key={user.id}>
            <h4>User: {user.name}</h4>
            <button onClick={() => usersStore.assignUnassignedTodo(user)}>
              Assign a todo
            </button>
            <br />
            Age: {user.age}
            <br />
            Todos:
            <br />
            {user.todos.map(todo => {
              return (
                <div
                  key={todo.id}
                  onClick={() => todosStore.toggleDoneStatus(todo)}
                  style={
                    todo.done ? { textDecoration: "line-through" } : undefined
                  }
                >
                  {todo.text}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default observer(UsersList);
