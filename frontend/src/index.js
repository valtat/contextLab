import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoalsContextProvider } from "./context/GoalsContext1";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <GoalsContextProvider>
      <App />
    </GoalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
