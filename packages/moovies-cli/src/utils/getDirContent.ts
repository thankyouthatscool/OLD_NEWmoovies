import glob from "glob";

export const getDirContent = (targetDirectory: string, recursive = true) => {
  let dirContent: string[];

  if (recursive) {
    dirContent = glob.sync(`${targetDirectory}/**/*`);
  } else {
    dirContent = glob.sync(`${targetDirectory}/*`);
  }

  return dirContent;
};
