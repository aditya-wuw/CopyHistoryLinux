import { getCurrentWindow } from "@tauri-apps/api/window";
export const appWindow = getCurrentWindow();


export async function HandleCopy(item: string) {
    if(!item) return;
    await navigator.clipboard.writeText(item);
    await appWindow.hide();
  }