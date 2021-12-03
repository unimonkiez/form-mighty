import produce from "immer";
import { RootAction, RootState } from "./types";

const initialState: RootState = {};

export const reducer = (state = initialState, action: RootAction) => {
  if (action.type === "@FORM_MIGHTY/RegisterForm") {
    const { uniqueKey, initialState } = action.payload;
    return {
      ...state,
      [uniqueKey]: initialState,
    };
  }

  return produce(state, (draft) => {
    switch (action.type) {
      case "@FORM_MIGHTY/UpdateFormValues": {
        const { uniqueKey, nextValues } = action.payload;
        draft[uniqueKey].values = nextValues;
        break;
      }
    }
  });
};
