"use client";
import React from "react";
import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";

function App({ children }: { children?: React.ReactNode }) {
  const store = makeStore();

  return <Provider store={store}>{children}</Provider>;
}

export default App;
