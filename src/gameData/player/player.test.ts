import Fertile from "./";
import Game from "../game";
import Player from './'
import { config } from "../../config";

const pState = {
  player: {
    statuses: {
      fertile: {
        initialised: true,
        isPregnant: true,
        body: {
          height: 5.4,
          weightBase: 138,
          waistBase: 25,
          weight: 138,
          waist: 25,
        },
        pregnancy: {
          known: false,
          progressDays: 0,
          progressWeeks: 0,
          publicProgressWeeks: 0,
          babies: 1,
          publicBabies: 0,
          publicFetus: "",
          fetus: {
            type: "Human",
            sizeIncrease: 100,
            weightIncrease: 100,
            strength: "normal",
            movement: "normal",
            menuText: {
              single: "a human child",
              multiple: "human children",
            },
          },
          inches: 0,
          weight: 0,
          seenAlerts: [],
        },
      },
    },
  },
};

describe("player tests", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("player can access fertility state easily", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player as Player;

    player.addStatus("fertile");

    expect(player.fertility).not.toBeNull();
  });
  it("player always has fertility state", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player as Player;

    expect(player.fertility).not.toBeNull();
  });
});
