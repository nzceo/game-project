import RPG from "create-rpg";
import Pregnancy from "./";
import { config } from "../../../config";

const { Game } = RPG;

describe("character class", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("statuses can be added to character", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("pregnancy");

    expect(player.statuses[0].name).toBe("Pregnant");
  });
});
