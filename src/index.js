import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="466655036166-5ns31hedgv7vrafkj9brsi9273ijj3p6.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
