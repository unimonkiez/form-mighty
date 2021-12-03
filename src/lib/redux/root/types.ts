import { FormState } from "../../types";
import { registerForm } from "./actions";

export interface RootState {
  [formKey: string]: FormState<any>;
}

export type RootAction = ReturnType<typeof registerForm>;
