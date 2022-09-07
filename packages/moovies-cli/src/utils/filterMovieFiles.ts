import { parse } from "node:path";

export const filterMovieFiles = (fileList: string[]) => {
  const moviesOnly = fileList.filter((location) => {
    const { ext } = parse(location);

    return !!ext;
  });

  return moviesOnly;
};
