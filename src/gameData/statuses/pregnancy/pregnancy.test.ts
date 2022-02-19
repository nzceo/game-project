import RPG from "create-rpg";
import Pregnancy from "./";
import { config } from "../../../config";

const { Game } = RPG;

describe("preg tests", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("status can be added to character", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("pregnancy");

    expect(player.statuses[0].name).toBe("Pregnant");
  });
});
