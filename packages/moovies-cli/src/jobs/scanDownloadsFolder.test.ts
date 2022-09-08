import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs-extra";
import { join } from "node:path";

import { scanDownloadsFolder, TEST_DIR, TEST_MOVIE_TITLES } from ".";

describe("scanDownloadsFolder", () => {
  beforeAll(() => {
    setupTests();
  });

  afterAll(() => {
    teardownTests();
  });

  it("scans", () => {
    scanDownloadsFolder(TEST_DIR, join(TEST_DIR, "Movies"));
  });
});

const setupTests = () => {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR);
    mkdirSync(join(TEST_DIR, "Movies"));
  }

  TEST_MOVIE_TITLES.forEach((movie) => {
    writeFileSync(join(TEST_DIR, movie), "Test Data");
  });
};

const teardownTests = () => {
  rmSync(join(__dirname, "../../__TEST__"), { force: true, recursive: true });
};
