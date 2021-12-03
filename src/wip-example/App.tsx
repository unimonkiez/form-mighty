import React from "react";
import { FormProvider } from "../lib/FormProvider";
import { MyForm } from "./MyForm";

export const App: React.FC = () => {
  return (
    <FormProvider>
      <MyForm />
    </FormProvider>
  );
};
