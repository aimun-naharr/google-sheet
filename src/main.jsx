import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AllRoutes from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      {/* <Routes>
        <Route path="/" element={<App />} />
      </Routes> */}
      <AllRoutes />
    </BrowserRouter>
  </StrictMode>
);
