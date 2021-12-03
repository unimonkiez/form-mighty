import { useEffect, useRef } from "react";
import { FormMighty, FormSubscriber, FormState, useInitForm } from "../lib";

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
  });

  useEffect(() => {
    setTimeout(() => {
      toolkit.updateValues((draft) => {
        draft.fieldA = "A UPDATED";
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
                subscription={({ values }: FormState<MyFormType>) => ({
                  a: values.fieldA,
                })}
              >
                {(results) => (
                  <RenderChecker scope="root > content > fieldA Subscriber">
                    <code>Results: {JSON.stringify(results)}</code>
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
