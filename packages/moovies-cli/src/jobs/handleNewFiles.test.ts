import chalk from "chalk";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs-extra";
import glob from "glob";
import { join, parse } from "node:path";

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
  "Under.the.Sea.1999.1080p.mp4",
];

describe("handleNewFiles", () => {
  beforeAll(() => {
    setupTests();

    handleNewFiles(TEST_DIR);
  });

  afterAll(() => {
    teardownTests();
  });

  it("creates correct number of directories", () => {
    const dirContent = glob.sync(`${TEST_DIR}/*`);

    expect(dirContent.length).toBe(7);
  });

  it(`formats ${chalk.bold.green("expected")} SCENE titles correctly`, () => {
    const fContent = glob.sync(`${TEST_DIR}/F/*`);
    const tContent = glob.sync(`${TEST_DIR}/T/*`);
    const wContent = glob.sync(`${TEST_DIR}/W/*`);

    const { base: fBase } = parse(fContent[0]);
    const { base: tBase } = parse(tContent[2]);
    const { base: wBase } = parse(wContent[0]);

    expect(fBase).toBe("Fall (2022).mp4");
    expect(tBase).toBe("Thor Love and Thunder (2022).mp4");
    expect(wBase).toBe("Where the Crawdads Sing (2022).mp4");
  });

  it(`formats ${chalk.bold.red(
    "unexpected"
  )} SCENE titles correctly`, () => {});
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
