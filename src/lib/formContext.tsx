import React from "react";
import { FormToolkit } from "./types";

export const formContext = React.createContext<FormToolkit<any>>(
  undefined as any
);
export const FormContextProvider = formContext.Provider;
export const FormContextConsumer = formContext.Consumer;
