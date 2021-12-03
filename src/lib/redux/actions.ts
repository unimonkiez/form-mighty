import { FormState, FormValuesType } from "../types";

export const registerForm = <V extends FormValuesType>(
  uniqueKey: string,
  initialState: FormState<V>
) => ({
  type: "@FORM_MIGHTY/RegisterForm" as const,
  payload: { uniqueKey, initialState },
});

export const updateFormValues = <V extends FormValuesType>(
  uniqueKey: string,
  nextValues: V
) => ({
  type: "@FORM_MIGHTY/UpdateFormValues" as const,
  payload: { uniqueKey, nextValues },
});
