import { useRef, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormContextProvider } from "./context";
import { createFormToolkit } from "./createFormToolkit";
import { createForm } from "./redux/root/actions";
import { FormToolkit, FormValuesType } from "./types";

export interface FormMightyProps<V extends FormValuesType> {
  toolkit?: FormToolkit;
  initialValues?: V;
  component?: React.ComponentType<any>;
  children?: (toolkit: FormToolkit) => React.ReactNode;
}

export const FormMighty: <V>(
  props: FormMightyProps<V>
) => React.ReactElement<any, any> | null = ({
  initialValues,
  toolkit: givenToolkit,
  component,
  children,
}) => {
  const dispatch = useDispatch();

  const createToolkitArgRef = useRef({ initialValues: initialValues ?? {} });

  const toolkit = useMemo(
    () => givenToolkit ?? createFormToolkit(createToolkitArgRef.current),
    [givenToolkit]
  );

  useEffect(() => {
    dispatch(
      createForm(toolkit.formKey, createToolkitArgRef.current.initialValues)
    );
  }, [dispatch, toolkit]);

  return (
    <FormContextProvider value={toolkit}>
      {component ?? children!(toolkit)}
    </FormContextProvider>
  );
};
