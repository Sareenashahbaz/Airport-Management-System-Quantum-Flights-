import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { TicketProvider } from "./context/TicketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <TicketProvider>
          <App />
        </TicketProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
