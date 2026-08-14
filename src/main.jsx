import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { CalendarApp } from "./CalendarApp.jsx";
import { Toaster } from "sileo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" />
    <CalendarApp />
  </StrictMode>,
);
