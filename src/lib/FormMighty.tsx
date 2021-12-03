import { useRef, useEffect } from "react";
import { FormContextProvider } from "./formContext";
import { createFormToolkit } from "./createFormToolkit";
import { FormToolkit, FormValuesType, Mandatory } from "./types";
import invariant from "invariant";

export interface FormMightyProps<V extends FormValuesType> {
  toolkit?: FormToolkit<V>;
  initialValues?: V;
  component?: React.ComponentType<any>;
  children?: (toolkit: FormToolkit<V>) => React.ReactNode;
}

export const FormMighty: <V>(
  props: FormMightyProps<V>
) => React.ReactElement<any, any> | null = ({
  initialValues = {},
  toolkit: givenToolkit,
  component,
  children,
}) => {
  invariant(
    component ?? children,
    "FormMighty - Must include one of [component, children] props"
  );

  const toolkitRef: React.MutableRefObject<Mandatory<typeof givenToolkit>> =
    useRef(givenToolkit ?? createFormToolkit({ initialValues }));

  useEffect(() => {
    toolkitRef.current.register();
  }, []);

  return (
    <FormContextProvider value={toolkitRef.current}>
      {component ?? children!(toolkitRef.current)}
    </FormContextProvider>
  );
};
