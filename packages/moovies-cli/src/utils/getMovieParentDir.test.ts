import {
  filterMovieFiles,
  filterSceneMovies,
  getDirContent,
  getMovieParentDir,
} from ".";
import { TEST_DIR } from "../test";

describe("getMovieParentDir", () => {
  it("gets movie parent dir", () => {
    const sceneMovies = filterSceneMovies(
      filterMovieFiles(getDirContent(TEST_DIR))
    );

    sceneMovies.map((movie) => {
      console.log(movie);

      return { ...movie, movieParentDir: getMovieParentDir(movie) };
    });
  });
});
