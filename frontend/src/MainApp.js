import React from "react";
import App from "./App";
import GoalsProvider from "./context/GoalsContext1";

const MainApp = () => {
  return (
    <GoalsProvider>
      <App />
    </GoalsProvider>
  );
};

export default MainApp;
