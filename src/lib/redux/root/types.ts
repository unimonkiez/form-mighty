import { FormValuesType } from "../../types";
import { createForm } from "./actions";

export interface FormState<V extends FormValuesType> {
  initialValues: Partial<V>;
  values: V;
}

export interface RootState {
  [formKey: string]: FormState<any>;
}

export type RootAction = ReturnType<typeof createForm>;
