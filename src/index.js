import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobalStyle from "./Globalstyle";
import { GLobalContextProvider } from "./context/global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GLobalContextProvider>
      <App />
    </GLobalContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
