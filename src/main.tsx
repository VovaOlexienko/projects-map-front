import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./section/App.tsx";
import "bootswatch/dist/lumen/bootstrap.min.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "@szhsin/react-menu/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
