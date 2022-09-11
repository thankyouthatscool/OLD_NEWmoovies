import chalk from "chalk";
import { mkdirSync, rmSync, writeFileSync } from "fs-extra";
import inquirer from "inquirer";
import { join } from "node:path";

import { handleNewFiles, scanDownloadsFolder } from "./jobs";

export const DOWNLOADS_DIR = "/mnt/c/Users/Sasha/Downloads";
export const PROGRAM_OPTIONS = [
  { name: "Format new movies", value: "new_files" },
  { name: "Scan Downloads Folder", value: "scan_downloads" },
  { name: "Exit", value: "exit" },
];
export const TARGET_DIR = "/mnt/d/Movies";

export const main = async () => {
  const res = await inquirer.prompt([
    {
      choices: PROGRAM_OPTIONS.map((option) => {
        return { name: option.name, value: option.value };
      }),
      message: chalk.bold.blue("What do now?"),
      name: "program_option",
      type: "list",
    },
  ]);

  switch (res.program_option) {
    case "new_files":
      handleNewFiles(TARGET_DIR);

      return;
    case "scan_downloads":
      scanDownloadsFolder(DOWNLOADS_DIR, TARGET_DIR);

      return;
    case "exit":
      console.log(
        chalk.bold.white(
          "\nCatch you guys on the flippity flip!\n".toUpperCase()
        )
      );

      return;
    default:
      console.log(chalk.bold.red("Not a valid option!"));

      main();
  }
};

main();

// (async () => {
//   const TEST_DOWNLOADS_DIR = join(__dirname, "../__TEST__");
//   const TEST_TARGET_DIR = join(__dirname, "../__TEST__/Movies");

//   // mkdirSync(TEST_DOWNLOADS_DIR);
//   mkdirSync(TEST_TARGET_DIR);

//   // ["Under.the.Sea.1999.1080p.mp4"].forEach((movie) => {
//   //   writeFileSync(join(TEST_DOWNLOADS_DIR, movie), "TEST DATA".repeat(99));
//   // });

//   await scanDownloadsFolder(TEST_DOWNLOADS_DIR, TEST_TARGET_DIR);

//   rmSync(TEST_TARGET_DIR, { force: true, recursive: true });
// })();
