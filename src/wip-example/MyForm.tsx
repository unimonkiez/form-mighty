import { useEffect, useRef } from "react";
import { FormState } from "src/lib/types";
import { FormMighty } from "../lib/FormMighty";
import { FormSubscriber } from "../lib/FormSubscriber";
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
  type MyFormType = { fieldA: string; fieldB: string; c: { x: [1, 2] } };
  const toolkit = useInitForm<MyFormType>({
    initialValues: {
      fieldA: "A",
      fieldB: "B",
      c: { x: [1, 2] },
    },
    validate: async () => {
      return new Promise((resolve) => setTimeout(() => resolve(false), 1000));
    },
  });

  useEffect(() => {
    setTimeout(() => {
      toolkit.updateValues((draft) => {
        draft.fieldB = "B UPDATED";
      });
    }, 3000);
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
                  // isValidating,
                  // isValid,
                })}
              >
                {(results) => (
                  <RenderChecker scope="root > content > fieldA Subscriber">
                    <code>
                      {JSON.stringify({
                        results,
                        // isValidating: toolkit.getState().isValidating,
                      })}
                    </code>
                  </RenderChecker>
                )}
              </FormSubscriber>
              {/* <FormSubscriber
                subscription={(state: FormState<MyFormType>) => state}
              >
                {(results) => (
                  <RenderChecker scope="root > content > all subscriber">
                    <code>{JSON.stringify(results)}</code>
                  </RenderChecker>
                )}
              </FormSubscriber> */}
            </RenderChecker>
          );
        }}
      </FormMighty>
    </RenderChecker>
  );
};
