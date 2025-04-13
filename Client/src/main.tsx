import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import UserContextProvider from "./contextsProviders/UserContextProvider.tsx";
import CaptainContextProvider from "./contextsProviders/CaptainContextProvider.tsx";
import SocketProvider from "./contextsProviders/SocketContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap your app in a SocketProvider */}
    <SocketProvider>
      {/* Wrap your app in a CaptainContext */}
      <CaptainContextProvider>
        {/* Wrap your app in a UserContext */}
        <UserContextProvider>
          {/* Wrap your app in a BrowserRouter */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </CaptainContextProvider>
    </SocketProvider>
  </StrictMode>
);
