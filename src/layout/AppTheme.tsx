import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import React, { useEffect } from "react";

type AppThemeProps = {
  children: React.ReactNode;
};
function AppTheme({ children }: AppThemeProps) {
  useEffect(() => {
    // Helper function to add/remove the .dark class
    const applyTheme = (theme: string | null) => {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };
    const currentWindow = WebviewWindow.getCurrent();
    // 1. Get and apply the initial theme
    currentWindow.theme().then(applyTheme);
    // 2. Listen for theme changes from the OS
    const unlisten = currentWindow.onThemeChanged(({ payload: theme }) => {
      applyTheme(theme);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, []);
  return <div>{children}</div>;
}

export default AppTheme;
