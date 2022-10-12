import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { whyDidYouUpdate } from "why-did-you-update";
import App from "./App";
import "./index.css";
import { store } from "./Redux/store";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
// whyDidYouUpdate(React);

root.render(
  <>
    {/* <React.StrictMode> */}
    {/* <ThemeProvider theme={theme}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ThemeProvider> */}
    {/* </React.StrictMode> */}
  </>
);
