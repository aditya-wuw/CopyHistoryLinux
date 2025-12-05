// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use crate::copy_logic::{
    cblisten::cblisten, copy::copy_history_add, copy::del_entry, copy::get_history,
};
use std::thread;

pub mod copy_logic;

//listens to the clipbord
fn listen_to_clipbord(app: &mut tauri::App) {
    let handle = app.handle().clone();
    thread::spawn(move || {
        cblisten(handle);
    });
}
//opens the window depending on a specific shortcut
fn open_window_on_global_shortcut(app: &mut tauri::App) {
    // add the logic
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            listen_to_clipbord(app);
            open_window_on_global_shortcut(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            copy_history_add,
            del_entry,
            get_history
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
