import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./data/store";
import App from "./App";
import "./index.css";

// if (process.env.NODE_ENV !== "production") {
// const { whyDidYouUpdate } = require("why-did-you-update");
// whyDidYouUpdate(React);
// }
import { whyDidYouUpdate } from "why-did-you-update";

const container = document.getElementById("root");
const root = createRoot(container);
whyDidYouUpdate(React);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
