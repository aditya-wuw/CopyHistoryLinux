use mouse_position::mouse_position::Mouse;
use tauri::{AppHandle, Manager, WindowEvent};

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
#[tauri::command]
fn hide_window(app: AppHandle) {
    println!("hiding the window");
    if let Some(main_window) = app.get_webview_window("main") {
        main_window.hide().unwrap();
    } else {
        println!("No window labeled 'main' found");
    }
}

#[tauri::command]
fn close_programe(app_handle: AppHandle) {
    println!("closing programe");
    app_handle.exit(0);
}

#[tauri::command]
fn show_window(app: tauri::AppHandle) {
    println!("window will show");
    window_pos(app, false);
}

#[tauri::command]
fn show_window_using_shortcut(app: tauri::AppHandle) {
    println!("window will show");
    window_pos(app, true);
}

// utils
fn window_pos(app: tauri::AppHandle, is_shortcut: bool) {
    if let Some(main_window) = app.get_webview_window("main") {
        if is_shortcut {
            let pos = Mouse::get_mouse_position();
            match pos {
                Mouse::Position { x, y } => main_window
                    .set_position(tauri::PhysicalPosition::new(x, y))
                    .expect("Failed to set window position"),
                _ => println!("Mouse returned something else"),
            }
        } else {
            main_window
                .set_position(tauri::PhysicalPosition::new(1500, 10))
                .expect("Failed to set window position");
        }
        main_window.show().unwrap();
        main_window.set_focus().unwrap();
    } else {
        println!("No window labeled 'main' found");
    }
}

//close on focus loss
// fn close_window_on_focus_loss(app: &mut tauri::App) {

// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::default().build())
        .on_window_event(|app_handle, event| match event {
            WindowEvent::Focused(focused) => {
                if !focused {
                    println!("window lost focus..");
                    if let Some(window) = app_handle.get_webview_window("main") {
                        window.hide().unwrap();
                    }
                }
            }
            _ => {}
        })
        .setup(|app| {
            listen_to_clipbord(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            copy_history_add,
            del_entry,
            get_history,
            close_programe,
            show_window,
            show_window_using_shortcut,
            hide_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
