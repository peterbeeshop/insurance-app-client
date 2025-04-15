// app/providers.jsx
"use client";
import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo-client";

interface IApolloClientProvider {
  children: ReactNode;
}

export function ApolloClientProvider({ children }: IApolloClientProvider) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
