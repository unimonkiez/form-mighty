import { createStore } from "redux";
import { rootReducer } from "./root/rootReducer";

export const store = createStore(
  rootReducer,
  // TODO - REMOVE THIS
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
