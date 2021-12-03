import { uniqueId } from "lodash";
import { FormToolkit, FormValuesType } from "./types";

export interface CreateFormToolkit {
  <V extends FormValuesType>(arg: { initialValues: Partial<V> }): FormToolkit;
}

export const createFormToolkit: CreateFormToolkit = ({ initialValues }) => {
  const toolkit: FormToolkit = {
    formKey: uniqueId("form-"),
  };

  return toolkit;
};
