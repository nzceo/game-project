import RPG from "create-rpg";
import Fertile from '../statuses/fertile'

const { Player } = RPG;

class ExtendedPlayer extends Player {
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
      this.addStatus("fertility");
      return this.activeStatuses.filter((status) => {
        return status.type === "fertile";
      })[0] as Fertile;
    }
    return fertilityState as Fertile; 
  }
}

export default ExtendedPlayer;
