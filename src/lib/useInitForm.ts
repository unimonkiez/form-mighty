import { useMemo, useRef } from "react";
import { createFormToolkit, CreateFormToolkitArg } from "./createFormToolkit";
import { FormToolkit, FormValuesType } from "./types";

export interface UseInitForm {
  <V extends FormValuesType>(arg?: CreateFormToolkitArg<V>): FormToolkit<V>;
}

export const useInitForm: UseInitForm = (arg = {}) => {
  const argRef = useRef(arg);

  const toolkit = useMemo(() => createFormToolkit(argRef.current), []);

  return toolkit;
};
