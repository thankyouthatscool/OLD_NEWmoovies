import { getDirContent } from ".";
import { TEST_DIR } from "../test";

describe("getDirectoryContent", () => {
  it("scans current dir only", () => {
    expect(getDirContent(TEST_DIR, false).length).toBe(17);
  });

  it("scans dirs recursively", () => {
    expect(getDirContent(TEST_DIR).length).toBe(21);
  });
});
