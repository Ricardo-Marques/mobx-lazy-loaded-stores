import React from "react";

import { CoreStoreProvider } from "core/store";
import { TodoList } from "web/todos/list";

const App: React.FC<{ coreStore: ICoreStore }> = props => {
  return (
    <CoreStoreProvider.Provider value={props.coreStore}>
      <TodoList />
    </CoreStoreProvider.Provider>
  );
};

export default App;
