import { PERIOD_SEPARATED_REGEX } from ".";

export const formatMovieTitle = (movieTitle: string) => {
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

  return movieTitleWords.map((word) => formatWord(word)).join(" ");
};

const formatWord = (word: string) => {
  if (["a", "of", "the"].includes(word)) {
    return word;
  } else if (!isNaN(parseInt(word))) {
    return word;
  } else {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  }
};
