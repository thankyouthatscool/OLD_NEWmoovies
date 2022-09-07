import chalk from "chalk";
import { existsSync, renameSync } from "fs-extra";
import inquirer from "inquirer";
import { join } from "node:path";

import {
  filterMovieFiles,
  filterSceneMovies,
  getDirContent,
  getMovieParentDir,
} from "./utils";

const TARGET_DIR = "/mnt/d/Movies";

const dirContent = getDirContent(TARGET_DIR);
const movieFiles = filterMovieFiles(dirContent);
const moviesToRename = filterSceneMovies(movieFiles);
const prepped = moviesToRename.map((movie) => {
  return {
    ...movie,
    movieParentDir: getMovieParentDir(movie)!,
    movieNewLocation: `${join(
      TARGET_DIR,
      getMovieParentDir(movie)!,
      movie.movieTitle
    )} (${movie.movieYear})${movie.movieExt}`,
  };
});

const main = async () => {
  const res = await inquirer.prompt([
    {
      choices: prepped.map((movie) => {
        return {
          name: `${chalk.bold.green(
            movie.movieTitle,
            `${movie.movieYear}`
          )}\nFrom:\t${chalk.red(movie.movieOldLocation)}\nTo:\t${chalk.blue(
            movie.movieNewLocation
          )}`,
          value: { from: movie.movieOldLocation, to: movie.movieNewLocation },
        };
      }),
      message: "Select movies to rename",
      name: "new movies",
      type: "checkbox",
    },
  ]);

  res["new movies"].forEach((movie: { from: string; to: string }) => {
    console.log(movie);

    if (existsSync(movie.from)) {
      renameSync(movie.from, movie.to);
    }
  });
};

if (prepped.length) {
  main();
} else {
  console.log("No movies to move");
}
