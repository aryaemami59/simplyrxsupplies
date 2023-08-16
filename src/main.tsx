import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { apiSlice } from "./redux/apiSlice";
import { store } from "./redux/store";

if (import.meta.env.DEV) {
  const { default: whyDidYouRender } = await import(
    "@welldone-software/why-did-you-render"
  );

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // include: [/./gi],
    collapseGroups: true,
  });
}

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

await store.dispatch(apiSlice.endpoints.getMain.initiate());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
