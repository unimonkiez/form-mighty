import { useRef, useEffect } from "react";
import { FormContextProvider } from "./formContext";
import { createFormToolkit, CreateFormToolkitArg } from "./createFormToolkit";
import { FormToolkit, FormValuesType, Mandatory } from "./types";
import invariant from "invariant";

export interface FormMightyProps<V extends FormValuesType>
  extends CreateFormToolkitArg<V> {
  toolkit?: FormToolkit<V>;
  component?: React.ComponentType<any>;
  children?: (toolkit: FormToolkit<V>) => React.ReactNode;
}

export const FormMighty: <V>(
  props: FormMightyProps<V>
) => React.ReactElement<any, any> | null = ({
  toolkit: givenToolkit,
  component,
  children,
  ...createToolkitArg
}) => {
  invariant(
    component ?? children,
    "FormMighty - Must include one of [component, children] props"
  );

  const toolkitRef: React.MutableRefObject<Mandatory<typeof givenToolkit>> =
    useRef(givenToolkit ?? createFormToolkit(createToolkitArg));

  useEffect(() => {
    toolkitRef.current.register();
  }, []);

  return (
    <FormContextProvider value={toolkitRef.current}>
      {component ?? children!(toolkitRef.current)}
    </FormContextProvider>
  );
};
