import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { invoke } from "@tauri-apps/api/core";
import { enable, isEnabled, disable } from "@tauri-apps/plugin-autostart";

export async function setupTray() {
  console.log(await isEnabled());
  const menu = await Menu.new({
    items: [
      {
        id: "show_app",
        text: "show app",
        action: async () => {
          await invoke("show_window");
        },
      },
      {
        id: "autostart_enable",
        text: "Enable Autostart",
        action: async () => {
          !(await isEnabled()) && enable();
        },
      },
      {
        id: "autostart_disable",
        text: "Disable Autostart",
        action: async () => {
          (await isEnabled()) && disable();
        },
      },
      {
        id: "quit",
        text: "Quit App",
        action: async () => {
          await invoke("close_programe");
        },
      },
    ],
  });

  const tray = await TrayIcon.new({
    icon: "icons/tray.png",
    id: "tray_app",
    title: "trayapp",
    tooltip: "show items",
    menu,
    menuOnLeftClick: true,
  });
  console.log("tray called");
  return tray;
}
