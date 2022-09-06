import { existsSync, mkdirSync } from "fs-extra";

export const checkParentDirsExist = (dir: string) => {
  if (!existsSync(dir)) {
    console.log(`Creating ${dir}.`);

    mkdirSync(dir);

    console.log(`${dir} created.`);
  }
};
