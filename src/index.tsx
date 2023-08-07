import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { RecoilRoot } from "recoil";

import "./i18n";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
