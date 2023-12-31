import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-yijjebqluhobrjbn.us.auth0.com"
    clientId="DSpyJxTdFjdqagGJyhVaiff4nboGvFi5"
    authorizationParams={{
      redirect_uri: "https://real-estate-ten-black.vercel.app"
    }}
    audience="http://localhost:8000"
    scope="openid profile name">
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
