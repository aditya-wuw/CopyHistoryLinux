import ReactDOM from "react-dom/client";
import App from "./App";
// import AppTheme from "./layout/AppTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <main className="dark:bg-gray-800 dark:border-gray-900 border-blue-900 dark:text-white bg-white rounded-xl overflow-hidden h-screen border">
    <App />
  </main>,
);
