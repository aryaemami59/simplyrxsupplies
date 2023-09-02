import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import apiSlice from "./redux/apiSlice";
// import * as hooks from "./redux/hooks";
import { store } from "./redux/store";

if (import.meta.env.DEV) {
  const { default: whyDidYouRender } = await import(
    "@welldone-software/why-did-you-render"
  );
  // const ReactRedux = await import("react-redux");
  // const { useAppSelector } = await import("./redux/hooks");

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // include: [/./gi],
    collapseGroups: true,
    trackHooks: true,
    // trackExtraHooks: [
    //   [ReactRedux.useSelector, "useSelector"],
    //   [useAppSelector, "useAppSelector"],
    // ],
  });
}

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

void store.dispatch(apiSlice.endpoints.getMain.initiate());

root.render(
  <React.StrictMode>
    <Provider
      noopCheck="always"
      stabilityCheck="always"
      store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
