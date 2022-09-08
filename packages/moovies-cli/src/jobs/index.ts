import { join } from "node:path";

export const MOVIE_EXTENSIONS = ["mk4", "mp4"];
export const PERIOD_SEPARATED_REGEX = /^((\w+)\.)+/;
export const SCENE_MOVIE_REGEX = /^(?<title>.*).?(?<year>\d{4}).?(\d{3,4})p/;
export const TEST_DIR = join(__dirname, "../../__TEST__");
export const TEST_MOVIE_TITLES = [
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

export * from "./handleNewFiles";

export * from "./scanDownloadsFolder";
