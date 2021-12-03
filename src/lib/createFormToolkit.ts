import { uniqueId } from "lodash";
import invariant from "invariant";
import { registerForm } from "./redux/root/actions";
import { store } from "./redux/store";
import { FormState, FormToolkit, FormValuesType } from "./types";

export interface CreateFormToolkit {
  <V extends FormValuesType>(arg: {
    initialValues: Partial<V>;
  }): FormToolkit<V>;
}

export const createFormToolkit: CreateFormToolkit = ({ initialValues }) => {
  const isMounted = false;

  const initialState: FormState<any> = {
    values: initialValues,
    initialValues,
  };

  const toolkit: FormToolkit<any> = {
    formKey: uniqueId("form-"),
    isRegistered: () => store.getState()[toolkit.formKey] !== undefined,
    register() {
      invariant(
        !toolkit.isRegistered(),
        "createFormToolkit - Form already registered!"
      );

      store.dispatch(registerForm(toolkit.formKey, initialState));
    },
    getState() {
      if (isMounted) {
        return store.getState()[toolkit.formKey];
      } else {
        return initialState;
      }
    },
    subscribe() {
      throw new Error("Not implemented yet");
    },
  };

  return toolkit;
};
