import chalk from "chalk";
import inquirer from "inquirer";
import { parse } from "node:path";

export const reportCopyProgressNew = () => {
  let DATA_TO_TRACK: {
    completedSize: number;
    movie: string;
    size: number;
  }[] = [];

  const uiReporter = new inquirer.ui.BottomBar();

  const addDataToTrack = ({ movie, size }: { movie: string; size: number }) => {
    DATA_TO_TRACK.push({ completedSize: 0, movie, size });

    console.log(`Added ${movie} to the copy queue.`);
  };

  const updateOutput = ({
    completedSize,
    movie,
  }: {
    completedSize: number;
    movie: string;
  }) => {
    const targetMovie = DATA_TO_TRACK.find((data) => data.movie === movie)!;
    const targetMovieIndex = DATA_TO_TRACK.indexOf(targetMovie);

    DATA_TO_TRACK = [
      ...DATA_TO_TRACK.slice(0, targetMovieIndex),
      { ...targetMovie, completedSize, movie },
      ...DATA_TO_TRACK.slice(targetMovieIndex + 1),
    ];

    const totalSize = DATA_TO_TRACK.reduce((acc, val) => {
      return val.size + acc;
    }, 0);

    const totalCompletedSize = DATA_TO_TRACK.reduce((acc, val) => {
      return acc + val.completedSize;
    }, 0);

    uiReporter.updateBottomBar(
      `\n${DATA_TO_TRACK.map(({ completedSize, movie, size }) => {
        const { base } = parse(movie);

        if (completedSize === size) {
          return chalk.bold.blue(
            `${base} -> ${chalk.yellow(humanFileSize(size))} -> ${chalk.green(
              "DONE!"
            )}`
          );
        } else {
          return `${base} -> ${humanFileSize(completedSize)}/${humanFileSize(
            size
          )}`;
        }
      }).join("\n")}\nTotal ${humanFileSize(
        totalCompletedSize
      )}/${humanFileSize(totalSize)}\n`
    );
  };

  return { addDataToTrack, updateOutput };
};

export const humanFileSize = (size: number) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));

  return `${parseFloat((size / Math.pow(1024, i)).toFixed(2)) * 1} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
};
