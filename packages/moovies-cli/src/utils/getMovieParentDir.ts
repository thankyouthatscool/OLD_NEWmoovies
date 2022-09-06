export const getMovieParentDir = (movieTitle: string) => {
  const movieTitleWords = movieTitle
    .trim()
    .split(".")
    .filter((word) => !!word);

  for (let i = 0; i < movieTitleWords.length; i++) {
    if (i === movieTitleWords.length - 1) {
      return movieTitleWords[i][0].toLocaleUpperCase();
    }

    if (/a|the/gi.test(movieTitleWords[i])) {
      continue;
    } else {
      if (!isNaN(parseInt(movieTitleWords[i]))) {
        return "#";
      } else {
        return movieTitleWords[i][0].toLocaleUpperCase();
      }
    }
  }

  return "S";
};
