import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
<<<<<<< HEAD
// import { whyDidYouUpdate } from "why-did-you-update";
=======
import React from "react";
>>>>>>> mu
import App from "./App";
import "./index.css";
import { store } from "./Redux/store";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
<<<<<<< HEAD
// whyDidYouUpdate(React);
=======
>>>>>>> mu

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
