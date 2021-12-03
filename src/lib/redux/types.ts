import { FormState } from "../types";
import * as actions from "./actions";

export interface RootState {
  [formKey: string]: FormState<any>;
}

export type RootAction = {
  [K in keyof typeof actions]: ReturnType<typeof actions[K]>;
}[keyof typeof actions];
