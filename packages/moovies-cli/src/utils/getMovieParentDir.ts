import { FilterSceneMoviesResultItem, PERIOD_SEPARATED_REGEX } from ".";

export const getMovieParentDir = (
  movieDetails: FilterSceneMoviesResultItem
) => {
  let movieTitleWords: string[];

  if (PERIOD_SEPARATED_REGEX.test(movieDetails.movieTitle)) {
    movieTitleWords = movieDetails.movieTitle
      .trim()
      .split(".")
      .filter((word) => !!word);
  } else {
    movieTitleWords = movieDetails.movieTitle
      .trim()
      .split(" ")
      .filter((word) => !!word);
  }

  for (let i = 0; i < movieTitleWords.length; i++) {
    if (i === movieTitleWords.length - 1) {
      return movieTitleWords[i][0].toUpperCase();
    }

    if (/a|an|the/i.test(movieTitleWords[i])) {
      continue;
    } else {
      if (!isNaN(parseInt(movieTitleWords[i]))) {
        return "#";
      } else {
        return movieTitleWords[i][0].toUpperCase();
      }
    }
  }
};
