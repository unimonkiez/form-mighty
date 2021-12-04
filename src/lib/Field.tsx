import { get } from "lodash";
import { FieldPath } from "./types";
import { useForm } from "./useForm";

export interface FieldProps<FP extends FieldPath.FieldPath<any, any>> {
  fieldPath: FP;
  children: (value: FieldPath.FieldValue<FP>) => React.ReactNode;
}

export const Field: <FP extends FieldPath.FieldPath<any, any>>(
  props: FieldProps<FP>
) => React.ReactElement<any, any> | null = ({ children, fieldPath }) => {
  const toolkit = useForm();
  return <>{children(get(toolkit.getState().values, fieldPath as string[]))}</>;
};
