import React from "react";
import { FormToolkit } from "./types";

export const context = React.createContext<FormToolkit>(undefined as any);
export const FormContextProvider = context.Provider;
export const FormContextConsumer = context.Consumer;
