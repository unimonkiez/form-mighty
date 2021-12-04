import { Object } from "ts-toolbelt";
import { DefaultFormValues } from "./DefaultFormValues";

export namespace FieldPath {
  export type FieldPath<
    V extends DefaultFormValues,
    P extends Object.Paths<V>
  > = P & {
    // This field is for compilation only. it should not be accessed.
    $$DefaultFormValues?: V;
  };

  export type FieldValue<FP extends FieldPath<any, any>> = FP extends FieldPath<
    infer V,
    infer P
  >
    ? Object.Path<V, P>
    : never;
}
