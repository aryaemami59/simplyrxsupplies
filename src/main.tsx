import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import apiSlice from "./redux/apiSlice";
import allSelectors from "./redux/selectors";
import { store } from "./redux/store";

if (import.meta.env.DEV) {
  const { default: whyDidYouRender } = await import(
    "@welldone-software/why-did-you-render"
  );
  const { getStateWith, registerSelectors } = await import("reselect-tools");
  getStateWith(() => store.getState());
  registerSelectors(allSelectors);
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // include: [/./gi],
    collapseGroups: true,
    trackHooks: true,
  });
}

void store.dispatch(apiSlice.endpoints.getMain.initiate());

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

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
