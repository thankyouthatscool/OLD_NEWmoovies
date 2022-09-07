import { formatMovieTitle } from ".";

describe("formatMovieTitle", () => {
  it("formats period separated title", () => {
    const formattedMovieTitle = formatMovieTitle("500.days.of.summer");

    expect(formattedMovieTitle).toBe("500 Days of Summer");
  });

  it("formats space separated titles", () => {
    const formattedMovieTitle = formatMovieTitle("500 days of summer");

    expect(formattedMovieTitle).toBe("500 Days of Summer");
  });
});
