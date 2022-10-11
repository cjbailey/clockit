import React, { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import AppContext from "./components/AppContext";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </StrictMode>
);
