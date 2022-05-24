import RPG from "ts-rpg-framework";
import Player from "../player";
import render from "../render";

const { Game } = RPG;

class ExtendedGame extends Game {
  day: number = 0;
  daysToSleep: number = 0;

  declare playerData?: Player;

  get player(): Player {
    return this.playerData!;
  }

  sleep(days: number = 1) {
    this.daysToSleep = days;
    for (let i = 0; i < this.daysToSleep; i++) {
      this.day = this.day + 1;
      this.player.activeStatuses.forEach((status) => {
        // @ts-ignore
        status.eachDay();
      });
    }
  }

  resetDaysToSleep() {
    this.daysToSleep = 0;
  }

  init() {
    this.playerData = new Player(this);
  }
}

export default ExtendedGame;
