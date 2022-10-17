import chalk from "chalk";
import cpy from "cpy";
import { renameSync, rmSync, statSync, unlinkSync } from "fs-extra";
import glob from "glob";
import inquirer from "inquirer";
import { join, parse } from "node:path";

import { MOVIE_EXTENSIONS, SCENE_MOVIE_REGEX } from ".";
import { main } from "..";
import { humanFileSize, reportCopyProgressNew } from "../utilities";

export const scanDownloadsFolder = async (
  downloadsDir: string,
  movieLibraryDir: string
) => {
  console.log(
    chalk.bold.green(
      `Looking for ${chalk.red("SCENE")} movies in ${chalk.blue(
        downloadsDir
      )}\n`
    )
  );

  const downloadsContent = glob.sync(
    `${downloadsDir}/**/*.+(${MOVIE_EXTENSIONS.join("|")})`
  );

  const sceneMovies = downloadsContent.filter((location) =>
    SCENE_MOVIE_REGEX.test(location)
  );

  if (!sceneMovies.length) {
    console.log(
      chalk.bold.yellow(
        `No new ${chalk.red("SCENE")} movies found in ${chalk.blue(
          downloadsDir
        )}\n`
      )
    );

    return main();
  }

  console.log(chalk.bold.yellow(`Found ${sceneMovies.length} movie(s):`));

  sceneMovies.forEach((movie) => {
    const { base } = parse(movie);
    const { size } = statSync(movie);

    console.log(chalk.bold.green(base), "->", chalk.red(humanFileSize(size)));
  });

  const { copy_confirmation } = await inquirer.prompt([
    {
      type: "confirm",
      message: "Does that look about right?",
      name: "copy_confirmation",
    },
  ]);

  if (copy_confirmation) {
    const { addDataToTrack, updateOutput } = reportCopyProgressNew();

    const res = await Promise.all(
      sceneMovies.map(async (movie) => {
        const { base, ext } = parse(movie);
        const { size } = statSync(movie);

        addDataToTrack({ movie, size });

        const destination = join(movieLibraryDir, base);
        await cpy(movie, destination).on("progress", ({ completedSize }) => {
          updateOutput({ completedSize, movie });
        });

        const res = glob.sync(`${destination}/*${ext}`);
        renameSync(res[0], join(movieLibraryDir, `TMP_${base}`));
        rmSync(destination, { force: true, recursive: true });
        renameSync(join(movieLibraryDir, `TMP_${base}`), destination);

        // TODO: Maybe delete source after

        return { movie, complete: true };
      })
    );

    const allGood = res.every((entry) => entry.complete);

    console.log(allGood);

    main();
  } else {
    main();
  }
};
