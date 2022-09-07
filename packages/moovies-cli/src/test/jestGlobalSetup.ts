import { existsSync, mkdirSync, writeFileSync } from "fs-extra";
import { join } from "node:path";

import { DUMMY_DIRS, DUMMY_MOVIE_NAMES, TEST_DIR } from ".";

export default async () => {
  setupTest();
};

const setupTest = () => {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR);
    writeDummyDirs(DUMMY_DIRS, TEST_DIR);
    writeDummyFiles(DUMMY_MOVIE_NAMES, TEST_DIR, DUMMY_DIRS);
  }
};

export const writeDummyDirs = (dummyDirNames: string[], dir: string) => {
  dummyDirNames.forEach((dirName) => {
    mkdirSync(join(dir, dirName));
  });
};

export const writeDummyFiles = (
  movieNames: string[],
  dir: string,
  nestedDirs?: string[]
) => {
  movieNames.forEach((movieName) => {
    const properNameVariation = `${movieName
      .split(" ")
      .slice(0, -1)
      .join(" ")} (${movieName.split(" ").slice(-1).join(" ")})`;
    const sceneNameVariation = movieName.split(" ").join(".");

    writeFileSync(join(dir, `${movieName} 1080p.mp4`), "test data");
    writeFileSync(join(dir, `${movieName} 720p.mp4`), "test data");
    writeFileSync(join(dir, `${sceneNameVariation}.1080p.mp4`), "test data");
    writeFileSync(join(dir, `${sceneNameVariation}.720p.mp4`), "test data");
    writeFileSync(join(dir, `${properNameVariation}.mp4`), "test data");
  });

  if (nestedDirs) {
    nestedDirs.forEach((nestedDir) => {
      writeFileSync(
        join(dir, nestedDir, `nested movie 2010 1080p.mp4`),
        "test data"
      );
      writeFileSync(
        join(dir, nestedDir, `nested.movie.2010.1080p.mp4`),
        "test data"
      );
    });
  }
};
