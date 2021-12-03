import { FormValuesType } from "../../types";

export const createForm = <V extends FormValuesType>(
  uniqueKey: string,
  initialValues: Partial<V> = {}
) => ({
  type: "@FORM_MIGHTY/Root_CreateForm" as const,
  payload: { uniqueKey, initialValues },
});
