import glob from "glob";
import { parse } from "node:path";

import { getMovieParentDir } from ".";

const SCENE_MOVIE_NAME_REGEX =
  /^(?<movieTitle>.+)(?<movieYear>\d{4})\.(?<resolution>\d{3,4}p)/;

export const getMoviesToRename = (dir: string) => {
  const allFiles = glob.sync(`${dir}/**/*`);

  return allFiles
    .map((location) => parse(location))
    .filter((location) => !!location.ext)
    .filter((location) => SCENE_MOVIE_NAME_REGEX.test(location.base))
    .map((location) => {
      const res = SCENE_MOVIE_NAME_REGEX.exec(location.base)!;

      return {
        old: `${location.dir}/${location.base}`,
        movieFileExtension: location.ext,
        movieParentDirectory: getMovieParentDir(res.groups!.movieTitle),
        movieTitle: res.groups!.movieTitle.split(".").join(" ").trim(),
        movieYear: parseInt(res.groups!.movieYear),
      };
    });
};
