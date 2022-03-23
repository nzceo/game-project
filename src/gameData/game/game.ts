import RPG from "create-rpg";
import Player from "../player";
import render from "../render";

const { Game } = RPG;

class ExtendedGame extends Game {
  day: number = 0;

  declare playerData?: Player;

  get player(): Player {
    return this.playerData!;
  }

  sleep(days: number = 1) {
    for (let i = 0; i < days; i++) {
      this.day = this.day + 1;
      this.player.activeStatuses.forEach((status) => {
        // @ts-ignore
        status.eachDay();
      });
    }
  }

  init() {
    this.playerData = new Player(this);
  }
}

export default ExtendedGame;
