import { filterMovieFiles, getDirContent } from ".";

import { TEST_DIR } from "../test";

describe("filterMovieFiles", () => {
  it("return list of movie files only", () => {
    expect(filterMovieFiles(getDirContent(TEST_DIR)).length).toBe(19);
  });
});
