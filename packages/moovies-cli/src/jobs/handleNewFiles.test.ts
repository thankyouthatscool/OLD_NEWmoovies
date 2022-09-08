import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs-extra";
import { join } from "node:path";

import { handleNewFiles } from ".";

const TEST_DIR = join(__dirname, "../../__TEST__");
const TEST_MOVIE_TITLES = [
  "500 days of summer 2009 1080p.mp4",
  "the gentlemen 2019 720p.mp4",
  "the the 2020 1080p.mp4",
  "the 2021 720p.mp4",
  "a a 2021 720p.mp4",
  "Thor.Love.and.Thunder.2022.1080p.WEBRip.x264-RARBG.mp4",
  "Fall.2022.1080p.WEBRip.DD5.1.x264-NOGRP.mp4",
  "Where.the.Crawdads.Sing.2022.1080p.BluRay.x264.DTS-FGT.mp4",
];

describe("handleNewFiles", () => {
  beforeAll(() => {
    setupTests();
  });

  afterAll(() => {
    teardownTests();
  });

  it("test", () => {
    handleNewFiles(TEST_DIR);
  });
});

const setupTests = () => {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR);
  }

  TEST_MOVIE_TITLES.forEach((movie) => {
    writeFileSync(join(TEST_DIR, movie), "Test Data");
  });
};

const teardownTests = () => {
  rmSync(join(__dirname, "../../__TEST__"), { force: true, recursive: true });
};
