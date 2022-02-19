import Fertile from "./";
import Game from '../../game'
import { config } from "../../../config";


describe("preg tests", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("status can be added to character", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("fertile");

    expect(player.statuses[0].name).toBe("Fertile");
  });
  it("correctly initialises state", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("fertile");

    expect(player.statuses[0].statusData.isPregnant).toBe(false);
  });
  it("does not initialise if data exists", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "statuses": {
            "fertile": {
              "initialised": true,
              "isPregnant": true
            }
          }
        }
       }`
    );
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("fertile");

    expect(player.statuses[0].statusData.isPregnant).toBe(true);
  });
  
  it("cycle progresses", () => {
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("fertile");

    expect(player.statuses[0].statusData.cycleProgress).toBe(5);
    
    game.sleep(9)
    
    expect(player.statuses[0].statusData.cycleProgress).toBe(14);
    expect(player.statuses[0].statusData.fertility).toBe(75);
    
    
    game.sleep(20)
    
    expect(player.statuses[0].statusData.cycleProgress).toBe(6);
    expect(player.statuses[0].statusData.fertility).toBe(20);
  });
});
