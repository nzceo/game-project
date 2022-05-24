import RPG from "ts-rpg-framework";
import Fertile from "../statuses/fertile";
import Game from "../game";

const { Player } = RPG;

class ExtendedPlayer extends Player {
  declare game: Game;

  get skills() {
    const combatSkills = this.getState("combat").skills;
    return {
      endurance: combatSkills.endurance,
      stamina: combatSkills.stamina,
      oneHanded: combatSkills.oneHanded,
      ranged: combatSkills.ranged,
      speech: combatSkills.speech,
      intelligence: combatSkills.intelligence,
    };
  }

  get fertility(): Fertile {
    const fertilityState = this.activeStatuses.filter((status) => {
      return status.type === "fertile";
    })[0];

    if (!fertilityState) {
      this.addStatus("fertile");
      return this.activeStatuses.filter((status) => {
        return status.type === "fertile";
      })[0] as Fertile;
    }
    return fertilityState as Fertile;
  }
}

export default ExtendedPlayer;
