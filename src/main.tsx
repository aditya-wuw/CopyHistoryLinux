import ReactDOM from "react-dom/client";
import App from "./App";

const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <main
    onContextMenu={handleContextMenu}
    className="dark:bg-gray-800 dark:border-gray-900 border-blue-900 dark:text-white bg-white rounded-xl overflow-hidden h-screen border"
  >
    <App />
  </main>,
);
