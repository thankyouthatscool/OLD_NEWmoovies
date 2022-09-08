import chalk from "chalk";
import cpy from "cpy";
import { renameSync, rmSync, statSync } from "fs-extra";
import glob from "glob";
import inquirer from "inquirer";
import throttle from "lodash.throttle";
import { join, parse } from "node:path";

import { MOVIE_EXTENSIONS, SCENE_MOVIE_REGEX } from ".";
import { main } from "..";

export const scanDownloadsFolder = async (
  downloadsDir: string,
  movieLibraryDir: string
) => {
  const downloadsContent = glob.sync(
    `${downloadsDir}/**/*.+(${MOVIE_EXTENSIONS.join("|")})`
  );

  const sceneMovies = downloadsContent.filter((location) =>
    SCENE_MOVIE_REGEX.test(location)
  );

  console.log(chalk.bold.yellow(`Found ${sceneMovies.length} movie(s):\n`));

  sceneMovies.forEach((movie) => {
    const { base } = parse(movie);
    const { size } = statSync(movie);

    console.log(chalk.bold.green(base), "->", chalk.red(size), "bytes", "\n");
  });

  const { copy_confirmation } = await inquirer.prompt([
    {
      type: "confirm",
      message: "Does that look about right?",
      name: "copy_confirmation",
    },
  ]);

  if (copy_confirmation) {
    await Promise.all(
      sceneMovies.map(async (movie) => {
        const reportCopyProgress = throttle(
          ({ completedSize }: cpy.ProgressData) => {
            console.log(
              `${chalk.bold.blue(base)} -> ${chalk.bold.green(
                completedSize
              )}/${chalk.bold.yellow(size)}`
            );
          },
          1000
        );
        const { base, ext } = parse(movie);
        const { size } = statSync(movie);
        const destination = join(movieLibraryDir, base);
        await cpy(movie, destination).on("progress", reportCopyProgress);

        console.log(`${chalk.bold.green(base)} ${chalk.bold.blue("copied!")}`);

        const res = glob.sync(`${destination}/*${ext}`);
        renameSync(res[0], join(movieLibraryDir, `TMP_${base}`));
        rmSync(destination, { force: true, recursive: true });
        renameSync(join(movieLibraryDir, `TMP_${base}`), destination);

        // TODO: Maybe delete source after
      })
    );

    main();
  } else {
    main();
  }
};
