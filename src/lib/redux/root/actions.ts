import { FormState, FormValuesType } from "../../types";

export const registerForm = <V extends FormValuesType>(
  uniqueKey: string,
  initialState: FormState<V>
) => ({
  type: "@FORM_MIGHTY/Root_RegisterForm" as const,
  payload: { uniqueKey, initialState },
});
