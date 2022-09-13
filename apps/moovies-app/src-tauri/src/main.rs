#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use glob::glob;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello {}", name)
}

#[tauri::command]
fn scan_dir_for_movies(path: &str) -> Vec<String> {
    let movie_files = glob(path)
        .expect("Could not scan directory...")
        .filter_map(Result::ok)
        .collect::<Vec<_>>()
        .iter()
        .map(|res| res.as_path())
        .filter_map(|res| res.file_name())
        .filter_map(|res| res.to_str())
        .map(|res| res.to_string())
        .collect::<Vec<_>>();

    return movie_files;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, scan_dir_for_movies])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
