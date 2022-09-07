import chalk from "chalk";
import inquirer from "inquirer";

import { handleNewFiles } from "./jobs";

export const PROGRAM_OPTIONS = [
  { name: "Format new movies", value: "new_files" },
];
export const TARGET_DIR = "/mnt/d/Movies";

// const main = async () => {
//   const res = await inquirer.prompt([
//     {
//       choices: PROGRAM_OPTIONS.map((option) => {
//         return { name: option.name, value: option.value };
//       }),
//       message: "Program Option",
//       name: "program_option",
//       type: "list",
//     },
//   ]);

//   switch (res.program_option) {
//     case "new_files":
//       handleNewFiles(TARGET_DIR);

//       return;
//     default:
//       console.log(chalk.bold.red("Not a valid option!"));

//       return;
//   }
// };

// main();

handleNewFiles(TARGET_DIR);
