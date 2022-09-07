import { filterMovieFiles, filterSceneMovies, getDirContent } from ".";
import { TEST_DIR } from "../test";

describe("filterSceneMovies", () => {
  it("returns scene movies only", () => {
    expect(
      filterSceneMovies(filterMovieFiles(getDirContent(TEST_DIR))).length
    ).toBe(16);
  });
});
