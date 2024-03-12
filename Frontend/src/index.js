// index.js or your main entry point file
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./Component/Users/AuthContext"; // Adjust the path based on your project structure

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
