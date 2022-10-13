import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { whyDidYouUpdate } from "why-did-you-update";
import App from "./App";
import "./index.css";
import { store } from "./Redux/store";

// if (process.env.NODE_ENV !== "production") {
// const { whyDidYouUpdate } = require("why-did-you-update");
// whyDidYouUpdate(React);
// }

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
// whyDidYouUpdate(React);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
