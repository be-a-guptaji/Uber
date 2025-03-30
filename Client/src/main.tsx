import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import UserContext from "./contexts/UserContext.tsx";
import CaptainContext from "./contexts/CaptainContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap your app in a CaptainContext */}
    <CaptainContext>
      {/* Wrap your app in a UserContext */}
      <UserContext>
        {/* Wrap your app in a BrowserRouter */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
