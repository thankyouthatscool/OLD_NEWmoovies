import chalk from "chalk";
import { existsSync, mkdirSync, renameSync } from "fs-extra";
import glob from "glob";
import inquirer from "inquirer";
import { join, parse } from "node:path";

import { PERIOD_SEPARATED_REGEX, SCENE_MOVIE_REGEX } from ".";
import { main } from "..";

export const handleNewFiles = async (dir: string) => {
  console.log(
    chalk.bold.green(
      `Looking for new ${chalk.red("SCENE")} movies in`,
      `${chalk.yellow(dir)}\n`
    )
  );

  const dirContent = getDirContent(dir);
  const movieDetails = dirContent.map((location) =>
    formatMovieLocationString(location, dir)
  );

  if (movieDetails.length) {
    console.log(
      chalk.bold.yellow(`Found ${movieDetails.length} movie(s) to rename:\n`)
    );

    movieDetails.forEach((movie) => {
      console.log(
        chalk.bold.green(`${movie.formattedMovieTitle} (${movie.year})`)
      );
      console.log(chalk.red(movie.oldLocation));
      console.log(chalk.blue(movie.newLocation, "\n"));
    });

    if (process.env.NODE_ENV === "test") {
      const allNewDirs = Array.from(
        new Set(movieDetails.map((location) => location.newDir))
      );

      checkAllNewLocations(allNewDirs);

      movieDetails.forEach((movie) => {
        renameSync(movie.oldLocation, movie.newLocation);
      });

      console.log(
        `${chalk.bold.green(
          `${movieDetails.length} movie(s) renamed successfully!`
        )}`
      );

      main();
    }

    const res = await inquirer.prompt([
      {
        message: "Does that look right?",
        name: "confirm_rename",
        type: "confirm",
      },
    ]);

    if (res.confirm_rename === true) {
      const allNewDirs = Array.from(
        new Set(movieDetails.map((location) => location.newDir))
      );

      checkAllNewLocations(allNewDirs);

      movieDetails.forEach((movie) => {
        renameSync(movie.oldLocation, movie.newLocation);
      });

      console.log(
        `${chalk.bold.green(
          `${movieDetails.length} movie(s) renamed successfully!`
        )}`
      );

      main();
    }
  } else {
    console.log(
      chalk.bold.yellow(`No ${chalk.red("SCENE")} movies to rename.\n`)
    );

    main();
  }
};

const getDirContent = (dir: string, recursive = false) => {
  let directoryContent: string[];

  if (recursive) {
    directoryContent = glob.sync(`${dir}/**/*`);
  } else {
    directoryContent = glob.sync(`${dir}/*`);
  }

  return directoryContent
    .filter((location) => {
      return parse(location).ext;
    })
    .filter((location) => SCENE_MOVIE_REGEX.test(location));
};

const formatMovieLocationString = (location: string, dir: string) => {
  const { base, ext } = parse(location);
  const { groups } = SCENE_MOVIE_REGEX.exec(base)!;
  const titleWordArray = getTitleWordArray(groups?.title!);
  const formattedMovieTitle = formatMovieTitle(titleWordArray);

  const movieParentDir = getMovieParentDir(titleWordArray)!;

  return {
    formattedMovieTitle,
    oldLocation: location,
    newDir: join(dir, movieParentDir),
    newLocation: join(
      dir,
      movieParentDir,
      `${formattedMovieTitle} (${groups?.year})${ext}`
    ),
    year: groups?.year!,
  };
};

const getTitleWordArray = (movieTitle: string) => {
  let movieTitleWords: string[];

  if (PERIOD_SEPARATED_REGEX.test(movieTitle)) {
    movieTitleWords = movieTitle
      .trim()
      .split(".")
      .filter((word) => !!word);
  } else {
    movieTitleWords = movieTitle
      .trim()
      .split(" ")
      .filter((word) => !!word);
  }

  return movieTitleWords;
};

const formatMovieTitle = (movieTitleWordArray: string[]) => {
  return movieTitleWordArray
    .map((word, index) => formatWord(word, index))
    .join(" ");
};

const formatWord = (word: string, index: number) => {
  if (["a", "an", "and", "of", "the"].includes(word.toLowerCase())) {
    if (index === 0) {
      `${word[0].toUpperCase()}${word.slice(1)}`;
    } else {
      return word;
    }
  }

  if (!isNaN(parseInt(word))) {
    return word;
  }

  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

const getMovieParentDir = (movieTitleWordArray: string[]) => {
  for (let i = 0; i < movieTitleWordArray.length; i++) {
    if (i === movieTitleWordArray.length - 1) {
      return movieTitleWordArray[i][0].toUpperCase();
    }

    if (/a|an|the/i.test(movieTitleWordArray[i])) {
      continue;
    } else {
      if (!isNaN(parseInt(movieTitleWordArray[i]))) {
        return "#";
      } else {
        return movieTitleWordArray[i][0].toUpperCase();
      }
    }
  }
};

const checkAllNewLocations = (newLocations: string[]) => {
  newLocations.forEach((location) => {
    if (!existsSync(location)) {
      mkdirSync(location);
    }
  });
};
