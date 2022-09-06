import chalk from "chalk";
import { existsSync, renameSync } from "fs-extra";
import glob from "glob";
import inquirer from "inquirer";
import { join } from "node:path";

import { checkParentDirsExist, getMoviesToRename } from "./utils";

const MOVIES_DIR = "/mnt/d/Movies";

const res = getMoviesToRename(MOVIES_DIR);

const newMovies = res.map((movieDetails) => ({
  oldName: movieDetails.old,
  destinationDirectory: join(MOVIES_DIR, movieDetails.movieParentDirectory),
  filename: `${movieDetails.movieTitle} (${movieDetails.movieYear})${movieDetails.movieFileExtension}`,
}));

console.log("Scanning for new movies...");

if (newMovies.length) {
  console.log("Renaming files...");

  newMovies.forEach((file) => {
    checkParentDirsExist(file.destinationDirectory);

    console.log(
      `Renaming ${file.oldName} to ${file.destinationDirectory}/${file.filename}`
    );

    if (existsSync(file.oldName) && existsSync(file.destinationDirectory)) {
      console.log("Source and destination OK...");

      renameSync(file.oldName, join(file.destinationDirectory, file.filename));
    }
  });
} else {
  console.log("No new movies to rename.");
}

console.log("Scanning for misplaces movies in root dir...");

const res2 = glob.sync(`${MOVIES_DIR}/*`);

console.log(res2);

const main = async () => {
  const res = await inquirer.prompt([
    {
      type: "checkbox",
      message: chalk.underline.bold.yellow("What do you need done?"),
      name: "selection",
      choices: [
        {
          checked: true,
          name: chalk.blue("Scan for new files"),
          value: "new_files",
        },
        { name: chalk.blue("Clean root directory"), value: "clean_root" },
      ],
    },
  ]);

  console.log(res);

  if (!!res.selection.length) {
    console.log("Looks like there's work to be done...");

    res.selection.forEach((selection: JobTitle) => jobLookup(selection));
  }
};

main();

type JobTitle = "new_files" | "clean_root";

const jobLookup = (jobTitle: JobTitle) => {
  switch (jobTitle) {
    case "clean_root":
      console.log("cleaning root");

      return;
    case "new_files":
      console.log("looking for the new files..");

      return;
    default:
      return;
  }
};
