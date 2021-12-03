import { useMemo, useRef } from "react";
import { createFormToolkit } from "./createFormToolkit";
import { FormToolkit, FormValuesType } from "./types";

export interface UseInitForm {
  <V extends FormValuesType>(arg?: { initialValues?: V }): FormToolkit;
}

export const useInitForm: UseInitForm = (arg) => {
  const argRef = useRef(arg);

  const toolkit = useMemo(
    () =>
      createFormToolkit({
        initialValues: argRef.current?.initialValues ?? {},
      }),
    []
  );

  return toolkit;
};
