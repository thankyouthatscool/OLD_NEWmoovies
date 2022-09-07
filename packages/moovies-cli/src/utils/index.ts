export const PERIOD_SEPARATED_REGEX = /^((\w+)\.)+/;
export const SCENE_MOVIE_REGEX =
  /^(?<movieTitle>.*).?(?<movieYear>\d{4}).?(\d{3,4})p/;

export * from "./filterMovieFiles";
export * from "./filterSceneMovies";
export * from "./formatMovieTitle";

export * from "./getDirContent";
export * from "./getMovieParentDir";
