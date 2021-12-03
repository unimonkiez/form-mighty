import { FormMighty } from "../lib/FormMighty";
import { useInitForm } from "../lib/useInitForm";

export const MyForm: React.FC = () => {
  const toolkit = useInitForm();
  return (
    <FormMighty toolkit={toolkit}>
      {(toolkit) => {
        return <code>{JSON.stringify(toolkit)}</code>;
      }}
    </FormMighty>
  );
};
