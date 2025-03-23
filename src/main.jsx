import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
     <Toaster richColors position="bottom-right"    />
    <App />
  </MantineProvider>
);
