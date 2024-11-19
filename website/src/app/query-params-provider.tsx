'use client'

import NextAdapterApp from "next-query-params/app";
import { FC, ReactNode } from "react";
import { QueryParamProvider as Provider } from "use-query-params";

export const QueryParamProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider adapter={NextAdapterApp}>{children}</Provider>;
};
