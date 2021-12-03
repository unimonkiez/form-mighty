import produce from "immer";
import { RootAction, RootState } from "./types";

const initialState: RootState = {};

export const rootReducer = (state = initialState, action: RootAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@FORM_MIGHTY/Root_CreateForm":
        const { uniqueKey, initialValues } = action.payload;
        draft[uniqueKey] = {
          initialValues,
          values: initialValues,
        };

        break;
    }
  });
};
