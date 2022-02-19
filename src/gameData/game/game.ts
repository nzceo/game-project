import RPG from "create-rpg";

const { Game } = RPG;

class ExtendedGame extends Game {
  day: number = 0;

  sleep(days: number = 1) {
    for (let i = 0; i < days; i++) {
      this.day = this.day + 1;
      this.player.activeStatuses.forEach((status) => {
        // @ts-ignore
        status.eachDay();
      });
    }
  }
}

export default ExtendedGame;
