import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./MainApp";
import { GoalsProvider } from "./context/GoalsContext1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoalsProvider>
      <App />
    </GoalsProvider>
  </React.StrictMode>
);
