import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SelectedPageProvider from "./contexts/selectedPageContext";
import store from "./redux/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <SelectedPageProvider>
        <App />
      </SelectedPageProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
