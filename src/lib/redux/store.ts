import { createStore } from "redux";
import { reducer } from "./reducer";

export const store = createStore(
  reducer,
  // TODO - REMOVE THIS
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
