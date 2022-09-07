import { parse } from "node:path";

import { formatMovieTitle, getMovieParentDir, SCENE_MOVIE_REGEX } from ".";

export interface FilterSceneMoviesResultItem {
  movieExt: string;
  movieOldLocation: string;
  movieTitle: string;
  movieYear: string;
}

export const filterSceneMovies = (
  fileList: string[]
): FilterSceneMoviesResultItem[] => {
  const sceneMovies = fileList
    .filter((movie) => {
      return SCENE_MOVIE_REGEX.test(movie);
    })
    .map((movie) => {
      const { groups } = SCENE_MOVIE_REGEX.exec(movie)!;

      const movieTitle = groups?.movieTitle
        .split("/")
        .slice(-1)
        .join("")
        .trim();

      return {
        movieExt: parse(movie).ext,
        movieOldLocation: movie,
        movieTitle: formatMovieTitle(movieTitle!),
        movieYear: groups?.movieYear!,
      };
    });

  return sceneMovies;
};
