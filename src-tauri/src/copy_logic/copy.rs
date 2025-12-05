use serde::{Deserialize, Serialize};
use std::fs::{self, File};
use std::io::{Read, Write};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Debug)]
pub struct CopyBord {
    id: Uuid,
    item: String,
}
const FILE_PATH: &str = "../data/copy_data.json";
const MAX_ENTRIES: usize = 5;
// pub type CopyHistory = Vec<CopyBord>;

#[tauri::command]
pub fn copy_history_add(content: String) -> Result<(), String> {
    // generate structure
    let new_item = CopyBord {
        id: Uuid::new_v4(),
        item: content.clone(),
    };
    // adds the directory if it's missing on the project root
    if let Some(parent) = std::path::Path::new(FILE_PATH).parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create directory: {}", e))?;
    }

    //check and decirialize the existing json
    let mut history: Vec<CopyBord> = match File::open(FILE_PATH) {
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
            // File does not exist, start with an empty history
            Vec::new()
        }
    };

    history.push(new_item);

    if history.len() > MAX_ENTRIES {
        let remove_count = history.len() - MAX_ENTRIES;
        history.drain(0..remove_count); // removes oldest records
    }

    let json_string = serde_json::to_string_pretty(&history).expect("Failed to serialize to JSON");
    let mut file = File::create(FILE_PATH).expect("Failed to create file");
    file.write_all(json_string.as_bytes())
        .expect("Failed to write to file");
    Ok(())
}

//getting the enties
#[tauri::command]
pub fn get_history() -> Result<Vec<CopyBord>, String> {
    let json_data = match fs::read_to_string(FILE_PATH) {
        Ok(data) => data,
        Err(_) => return Ok(vec![]), // no file -> return empty
    };
    // Parse JSON safely
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
    let json_file = match fs::read_to_string(FILE_PATH) {
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

    match File::create(FILE_PATH).and_then(|mut file| file.write_all(json_string.as_bytes())) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to write updated history to file: {}", e)),
    }
}
