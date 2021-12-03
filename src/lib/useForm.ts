import { useContext } from "react";
import { formContext } from "./formContext";
import { FormToolkit, FormValuesType } from "./types";

export const useForm = <V extends FormValuesType = any>() =>
  useContext(formContext) as FormToolkit<V>;
