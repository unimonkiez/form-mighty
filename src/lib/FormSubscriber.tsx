import { FormToolkit, SubscribeFn, ValuesOfSubscription } from "./types";
import invariant from "invariant";
import { useForm } from "./useForm";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useRef } from "react";

export interface FormSubscriberProps<
  Subscription extends SubscribeFn<any, any>
> {
  subscription: Subscription;
  onMount?: (
    subscriptonResult: ReturnType<Subscription>,
    toolkit: FormToolkit<ValuesOfSubscription<Subscription>>
  ) => void;
  onChange?: (
    subscriptonResult: ReturnType<Subscription>,
    toolkit: FormToolkit<ValuesOfSubscription<Subscription>>
  ) => void;
  children?: (
    subscriptonResult: ReturnType<Subscription>,
    toolkit: FormToolkit<ValuesOfSubscription<Subscription>>
  ) => React.ReactNode;
}

export const FormSubscriber: <Subscription extends SubscribeFn<any, any>>(
  props: FormSubscriberProps<Subscription>
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
