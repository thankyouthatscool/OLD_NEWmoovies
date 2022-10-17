#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use glob::glob;
use serde::Serialize;
use tauri::Manager;
#[derive(Clone, Debug, Serialize)]
struct MovieFile {
    extension: String,
    location: String,
    name: String,
}

#[tauri::command]
fn scan_dir_for_movies(path: &str) -> Vec<MovieFile> {
    let glob_result = glob(path);

    match glob_result {
        Ok(data) => {
            let movie_files = data
                .filter_map(Result::ok)
                .collect::<Vec<_>>()
                .iter()
                .map(|data| data.as_path())
                .map(|data| {
                    let file_extension = data.extension().unwrap().to_str().unwrap().to_string();
                    let file_location = data.to_str().unwrap().to_string();
                    let file_name = data.file_name().unwrap().to_str().unwrap().to_string();

                    return MovieFile {
                        extension: file_extension,
                        location: file_location,
                        name: file_name,
                    };
                })
                .collect::<Vec<_>>();

            movie_files
        }
        Err(err) => {
            println!("{:#?}", err);

            let empty_movie_vec: Vec<MovieFile> = Vec::new();

            empty_movie_vec
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![scan_dir_for_movies])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
