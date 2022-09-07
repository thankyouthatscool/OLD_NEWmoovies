import { existsSync, rmSync } from "fs-extra";

import { TEST_DIR } from ".";

export default async () => {
  teardownTest();
};

export const teardownTest = () => {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { force: true, recursive: true });
  }
};
