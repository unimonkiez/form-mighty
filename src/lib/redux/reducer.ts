import produce from "immer";
import { RootAction, RootState } from "./types";

const initialState: RootState = {};

export const reducer = (state = initialState, action: RootAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@FORM_MIGHTY/RegisterForm": {
        const { uniqueKey, initialState } = action.payload;
        return {
          ...state,
          [uniqueKey]: initialState,
        };
      }
      case "@FORM_MIGHTY/UpdateFormValues": {
        const { uniqueKey, nextValues, isStartValidation } = action.payload;
        draft[uniqueKey].values = nextValues;
        draft[uniqueKey].isValidating = isStartValidation;
        break;
      }
      case "@FORM_MIGHTY/StartValidation": {
        const { uniqueKey } = action.payload;
        draft[uniqueKey].isValidating = true;
        break;
      }
      case "@FORM_MIGHTY/CompleteValidation": {
        const { uniqueKey, result } = action.payload;
        draft[uniqueKey].isValid = result;
        draft[uniqueKey].isValidating = false;
      }
    }
  });
};
