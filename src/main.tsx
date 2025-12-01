import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppTheme from "./layout/AppTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <main className="dark:bg-gray-800 dark:text-white h-screen">
        <App />
      </main>
    </AppTheme>
  </React.StrictMode>,
);
