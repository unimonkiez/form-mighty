import { DefaultFormValues } from ".";

export interface FormToolkitOptions<
  V extends DefaultFormValues = DefaultFormValues
> {
  initialValues?: Partial<V>;
  validate?: (values: V) => boolean | Promise<boolean>;
  isInitialValid?: boolean;
  isInitialRequiresValidation?: boolean;
}
