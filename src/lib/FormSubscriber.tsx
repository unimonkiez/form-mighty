import { FormState, DefaultFormValues } from "./types";
import invariant from "invariant";
import { useForm } from "./useForm";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useRef } from "react";
import { FormToolkit } from "./FormToolkit";

export interface FormSubscriberProps<V extends DefaultFormValues, T> {
  subscription: (state: FormState<V>) => T;
  onMount?: (subscriptonResult: T, toolkit: FormToolkit<V>) => void;
  onChange?: (subscriptonResult: T, toolkit: FormToolkit<V>) => void;
  children?: (subscriptonResult: T, toolkit: FormToolkit<V>) => React.ReactNode;
}

export const FormSubscriber: <V extends DefaultFormValues, T>(
  props: FormSubscriberProps<V, T>
) => React.ReactElement<any, any> | null = ({
  subscription,
  onMount,
  onChange,
  children,
}) => {
  invariant(
    onMount ?? onChange ?? children,
    "FormSubscriber - Must include one of [onMount, onChange, children] props"
  );

  const formToolkit = useForm<any>();

  const subscriptonResult = useSelector(() => {
    return subscription(formToolkit.getState());
  }, shallowEqual);

  const mountedRef = useRef(false);
  const refs = useRef({ onChange, onMount });

  useEffect(() => {
    if (mountedRef.current) {
      refs.current.onChange?.(subscriptonResult, formToolkit);
    } else {
      mountedRef.current = true;
      refs.current.onMount?.(subscriptonResult, formToolkit);
    }
  }, [formToolkit, subscriptonResult]);

  return <>{children?.(subscriptonResult, formToolkit) ?? null}</>;
};
