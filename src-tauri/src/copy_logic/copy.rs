use crate::COPY_PATH;
use serde::{Deserialize, Serialize};
use serde_json::Number;
use std::fs::{self, File};
use std::io::{Read, Write};
use std::path::PathBuf;
use uuid::Uuid;
#[derive(Deserialize, Serialize, Debug)]

pub struct CopyBord {
    id: Uuid,
    item: String,
    pinned: bool,
}

const MAX_ENTRIES: usize = 10;

fn file_data_path() -> &'static PathBuf {
    COPY_PATH.get().expect("COPY_PATH not initialized")
}

fn write_file(json: String) {
    let mut file = File::create(file_data_path()).expect("Failed to create file");
    file.write_all(json.as_bytes())
        .expect("Failed to write to file");
}

#[tauri::command]
pub fn get_enties_limit_by_user(limit: Number) {
    println!("limit set to{}", limit);
}

#[tauri::command]
pub fn copy_history_add(content: String) -> Result<(), String> {
    // generate structure
    let new_item = CopyBord {
        id: Uuid::new_v4(),
        item: content.clone(),
        pinned: false,
    };
    // adds the directory if it's missing on the project root
    if let Some(parent) = std::path::Path::new(file_data_path()).parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create directory: {}", e))?;
    }
    //check and decirialize the existing json
    let mut history: Vec<CopyBord> = match File::open(file_data_path()) {
        Ok(mut file) => {
            let mut json_str = String::new();
            if file.read_to_string(&mut json_str).is_ok() && !json_str.is_empty() {
                serde_json::from_str(&json_str).unwrap_or_else(|e| {
                    eprintln!("Error deserializing JSON: {}", e);
                    Vec::new() // Fallback to empty if deserialization fails
                })
            } else {
                Vec::new()
            }
        }
        Err(_) => {
            //start with an empty history
            Vec::new()
        }
    };

    history.insert(0, new_item);

    if history.len() > MAX_ENTRIES {
        let remove_count = history.len() - MAX_ENTRIES;
        history.drain(0..remove_count); // removes oldest records
    }

    let json_string = serde_json::to_string_pretty(&history).expect("Failed to serialize to JSON");
    write_file(json_string);
    Ok(())
}

//getting records
#[tauri::command]
pub fn get_history() -> Result<Vec<CopyBord>, String> {
    let json_data = match fs::read_to_string(file_data_path()) {
        Ok(data) => data,
        Err(_) => return Ok(vec![]),
    };
    let history: Vec<CopyBord> =
        serde_json::from_str(&json_data).map_err(|e| format!("JSON read failed: {}", e))?;

    Ok(history)
}

//delete logic
#[tauri::command]
pub fn del_entry(id: String) -> Result<(), std::string::String> {
    let target_uuid: Uuid = match Uuid::parse_str(&id) {
        Ok(uuid) => uuid,
        Err(e) => return Err(format!("Invalid uuid for deletion: {}", e)),
    };

    //read file
    let json_file = match fs::read_to_string(file_data_path()) {
        Ok(data) => data,
        Err(e) => {
            if e.kind() == std::io::ErrorKind::NotFound {
                return Ok(());
            }
            return Err(format!("Failed to read history file: {}", e));
        }
    };
    //deserialize
    let mut history: Vec<CopyBord> = match serde_json::from_str(&json_file) {
        Ok(h) => h,
        Err(e) => return Err(format!("Failed to deserialize history data: {}", e)),
    };
    let initiallen = history.len();
    history.retain(|entry| entry.id != target_uuid);

    //verify the deletion
    if history.len() == initiallen {
        println!("Entry with id: {} not found.", id);
        return Ok(());
    } else {
        println!("Entry with id: {} deleted.", id);
    }
    //Serialize the modified vector back into a JSON string
    let json_string = match serde_json::to_string_pretty(&history) {
        Ok(s) => s,
        Err(e) => return Err(format!("Failed to serialize history: {}", e)),
    };

    match File::create(file_data_path()).and_then(|mut file| file.write_all(json_string.as_bytes()))
    {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to write updated history to file: {}", e)),
    }
}

//pin logic
#[tauri::command]
pub fn pin_history(id: Uuid) -> Result<(), String> {
    let mut history = get_history()?;
    for rec in history.iter_mut() {
        if rec.id == id {
            rec.pinned = true;
        }
    }
    let json_file = serde_json::to_string_pretty(&history).map_err(|e| e.to_string())?;
    write_file(json_file);
    println!("pinned id: {}", id);
    Ok(())
}
