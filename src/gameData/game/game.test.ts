import { config } from "../../config";
import Game from "./";

describe("extended game tests", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("eachDay is called on sleep", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("pregnancy");

    const mockedEachDay = jest.fn();

    player.activeStatuses[0].eachDay = mockedEachDay;

    game.sleep();

    expect(mockedEachDay).toHaveBeenCalled();
  });
  it("eachDay is called multiple times if sleep multiple days", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("pregnancy");

    const mockedEachDay = jest.fn();

    player.activeStatuses[0].eachDay = mockedEachDay;

    const days = 7;

    game.sleep(days);

    expect(mockedEachDay).toHaveBeenCalledTimes(days);
  });
});
