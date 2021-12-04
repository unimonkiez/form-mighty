import { uniqueId } from "lodash";
import produce from "immer";
import invariant from "invariant";
import {
  startValidation,
  registerForm,
  completeValidation,
  updateFormValues,
} from "./redux/actions";
import { store } from "./redux/store";
import { FormState, FormToolkit, FormValuesType } from "./types";

export interface CreateFormToolkitArg<
  V extends FormValuesType = FormValuesType
> {
  initialValues?: Partial<V>;
  validate?: (values: V) => boolean | Promise<boolean>;
  isInitialValid?: boolean;
  isInitialRequiresValidation?: boolean;
}

export interface CreateFormToolkit {
  <V extends FormValuesType = FormValuesType>(
    arg: CreateFormToolkitArg<V>
  ): FormToolkit<V>;
}

export const createFormToolkit: CreateFormToolkit = ({
  initialValues = {},
  validate = () => true,
  isInitialValid = true,
  isInitialRequiresValidation = true,
}) => {
  const initialState: FormState<any> = {
    values: initialValues,
    initialValues,
    isValid: isInitialValid,
    isValidating: isInitialRequiresValidation,
  };

  let validationPromise = Promise.resolve({
    timestamp: Date.now(),
    isValid: true,
  });

  const toolkit: FormToolkit<any> = {
    formKey: uniqueId("form-"),
    isRegistered: () => store.getState()[toolkit.formKey] !== undefined,
    register() {
      invariant(
        !toolkit.isRegistered(),
        "createFormToolkit - Form already registered!"
      );

      store.dispatch(registerForm(toolkit.formKey, initialState));

      if (isInitialRequiresValidation) {
        toolkit.validate();
      }
    },
    getState() {
      if (toolkit.isRegistered()) {
        return store.getState()[toolkit.formKey];
      } else {
        return initialState;
      }
    },
    subscribe() {
      throw new Error("Not implemented yet");
    },
    updateValues(arg, isStartValidation = true) {
      store.dispatch(
        updateFormValues(
          toolkit.formKey,
          produce(toolkit.getState().values, arg),
          isStartValidation
        )
      );

      if (isStartValidation) {
        toolkit.validate();
      }
    },
    async validate() {
      const { values } = toolkit.getState();

      const { timestamp, isValid } = await validationPromise;

      if (timestamp < Date.now()) {
        validationPromise = new Promise(async (resolve) => {
          store.dispatch(startValidation(toolkit.formKey));

          const result = await validate(values);

          store.dispatch(completeValidation(toolkit.formKey, result));
          return resolve({
            isValid: result,
            timestamp: Date.now(),
          });
        });

        return validationPromise.then(({ isValid }) => isValid);
      } else {
        return isValid;
      }
    },
  };

  return toolkit;
};
