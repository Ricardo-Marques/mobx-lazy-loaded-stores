import React from "react";

import { CoreStoreProvider } from "core/store";

const LazyTodoCreator = React.lazy(() => import("web/todos/creator"));

const LazyTodoList = React.lazy(() => import("web/todos/list"));

const App: React.FC<{ coreStore: ICoreStore }> = props => {
  return (
    <CoreStoreProvider.Provider value={props.coreStore}>
      <React.Suspense fallback={"loading..."}>
        <LazyTodoCreator />
        <LazyTodoList />
      </React.Suspense>
    </CoreStoreProvider.Provider>
  );
};

export default App;
