import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SelectedPageProvider from "./contexts/selectedPageContext";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <SelectedPageProvider>
      <App />
    </SelectedPageProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
