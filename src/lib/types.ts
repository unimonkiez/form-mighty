export type FormValuesType = Record<string, any>;
export interface FormState<V extends FormValuesType> {
  initialValues: Partial<V>;
  values: V;
}

export interface FormToolkit<V extends FormValuesType> {
  formKey: string;
  isRegistered: () => boolean;
  register(): void;
  getState(): FormState<V>;
  subscribe(arg: <T>(formState: FormState<V>) => T): UnsubscribeFn;
}

export type UnsubscribeFn = () => void;

/// TS Helpers
export type Mandatory<T> = Exclude<T, undefined>;
