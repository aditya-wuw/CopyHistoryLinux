use clipboard_listener::listen_clipboard;
use tauri::async_runtime;
use tauri::Emitter;
use tauri_plugin_clipboard_manager::ClipboardExt;

use crate::copy_logic::copy::copy_history_add;
pub fn cblisten(app_handle: tauri::AppHandle) {
    let ah = app_handle.clone();

    let callback = move || {
        let ah_inner = ah.clone();
        async_runtime::spawn(async move {
            match ah_inner.clipboard().read_text() {
                Ok(text) => {
                    if let Err(e) = ah_inner.emit("clipboard-changed", text.clone()) {
                        eprintln!("Emit failed: {:?}", e);
                    }
                    let _ = copy_history_add(text);
                }
                Err(e) => eprintln!("Failed reading clipboard: {:?}", e),
            }
        });
    };

    if let Err(e) = listen_clipboard(Box::new(callback)) {
        eprintln!("Clipboard listener error: {:?}", e);
    }
}




