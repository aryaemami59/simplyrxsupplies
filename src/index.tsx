import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";
import "./index.css";
import { store } from "./Redux/store";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </>
);
