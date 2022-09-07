import chalk from "chalk";
import glob from "glob";
import { parse } from "node:path";

export const SCENE_MOVIE_REGEX =
  /^(?<movieTitle>.*).?(?<movieYear>\d{4}).?(\d{3,4})p/;

export const handleNewFiles = (dir: string) => {
  console.log(
    chalk.bold.green("Looking for new movies in", `${chalk.yellow(dir)}`)
  );

  const dirContent = getDirContent(dir);
  const movieDetails = dirContent.map((location) =>
    formatMovieLocationString(location)
  );

  console.log(movieDetails);
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

const formatMovieLocationString = (location: string) => {};
