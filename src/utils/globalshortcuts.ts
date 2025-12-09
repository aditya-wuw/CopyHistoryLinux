import { invoke } from '@tauri-apps/api/core';
import { register} from '@tauri-apps/plugin-global-shortcut';

export async function register_shortcuts(){
    const shortcut_open:string = "Control+Alt+X";
    const shortcut_close:string = "Control+Alt+C";
    await register(shortcut_open,async()=>{
        await invoke("show_window_using_shortcut");
        console.log("called shortcut show");
    })
    await register(shortcut_close,async()=>{
        await invoke("hide_window");
        console.log("called shortcut hide");
    })
}