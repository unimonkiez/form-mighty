import React from "react";
import { FormToolkit } from "./FormToolkit";

export const context = React.createContext<FormToolkit<any>>(undefined as any);
export const FormContextProvider = context.Provider;
export const FormContextConsumer = context.Consumer;
