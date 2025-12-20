import { invoke } from "@tauri-apps/api/core";
import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut";

export async function register_shortcut() {
  await unregisterAll();
  const shortcut_open = "Ctrl+Alt+S";
  const shortcut_close = "Ctrl+Alt+X";
  await register(shortcut_open, async () => {
    await invoke("show_window_using_shortcut");
    console.log("called shortcut show");
  });
  await register(shortcut_close, async () => {
    await invoke("hide_window");
    console.log("called shortcut hide");
  });
}
