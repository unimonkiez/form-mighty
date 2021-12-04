import { useContext } from "react";
import { context } from "./context";
import { FormToolkit } from "./FormToolkit";
import { DefaultFormValues } from "./types";

export interface UseForm {
  <V extends DefaultFormValues>(): FormToolkit<V>;
}

export const useForm: UseForm = () => useContext(context);
