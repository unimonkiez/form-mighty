import { Draft } from "immer";

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
  subscribe: <T>(
    ...args: Parameters<SubscribeFn<V, T>>
  ) => ReturnType<SubscribeFn<V, T>>;
  updateValues: (arg: (valuesDraft: Draft<V>) => void | V) => void;
}

export type SubscribeFn<V, T> = (formState: FormState<V>) => T;

export type UnsubscribeFn = () => void;

/// TS Helpers
export type Mandatory<T> = Exclude<T, undefined>;

export type ValuesOfSubscription<S extends SubscribeFn<any, any>> =
  S extends SubscribeFn<infer V, any> ? V : never;
