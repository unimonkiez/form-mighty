import { useEffect, useRef } from "react";
import { FormMighty } from "../lib/FormMighty";
import { FormSubscriber } from "../lib/FormSubscriber";
import { FormState } from "../lib/types";
import { useInitForm } from "../lib/useInitForm";

const RenderChecker: React.FC<{ scope?: string }> = ({ scope, children }) => {
  const countRef = useRef(1);

  useEffect(() => {
    countRef.current += 1;
  });

  return (
    <div style={{ margin: 10 }}>
      <div style={{ background: "lightblue", padding: 4 }}>
        <span style={{ background: "lightyellow" }}>Scope - {scope}</span>
        <br />
        <span style={{ background: "lightyellow" }}>
          Renders count: {countRef.current}
        </span>
        <br />
      </div>
      <div style={{ padding: 6, background: "lightgray" }}>
        <div style={{ background: "lightblue", padding: 2, fontSize: 10 }}>
          <span style={{ background: "lightyellow" }}>Children</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export const MyForm: React.FC = () => {
  type MyFormType = { fieldA: string; fieldB: string };
  const toolkit = useInitForm<MyFormType>({
    initialValues: {
      fieldA: "A",
      fieldB: "B",
    },
    validate: async () => {
      return new Promise((resolve) => setTimeout(() => resolve(false), 3000));
    },
  });

  useEffect(() => {
    setTimeout(() => {
      toolkit.updateValues((draft) => {
        draft.fieldA = "A UPDATED";
      });
    }, 5000);
  }, [toolkit]);

  return (
    <RenderChecker scope="root">
      <FormMighty toolkit={toolkit}>
        {(toolkit) => {
          return (
            <RenderChecker scope="root > content">
              <code>{JSON.stringify(toolkit.getState())}</code>
              <br />
              <FormSubscriber
                subscription={({
                  values,
                  isValid,
                  isValidating,
                }: FormState<MyFormType>) => ({
                  subscribedFieldA: values.fieldA,
                  isValidating,
                  isValid,
                })}
              >
                {(results) => (
                  <RenderChecker scope="root > content > fieldA Subscriber">
                    <code>{JSON.stringify(results)}</code>
                  </RenderChecker>
                )}
              </FormSubscriber>
              <FormSubscriber
                subscription={(state: FormState<MyFormType>) => state}
              >
                {(results) => (
                  <RenderChecker scope="root > content > all subscriber">
                    <code>{JSON.stringify(results)}</code>
                  </RenderChecker>
                )}
              </FormSubscriber>
            </RenderChecker>
          );
        }}
      </FormMighty>
    </RenderChecker>
  );
};
