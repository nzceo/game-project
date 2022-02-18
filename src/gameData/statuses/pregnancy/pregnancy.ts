import RPG from "create-rpg";

const { Status } = RPG;

class Pregnancy extends Status {
  constructor(game: any, character: any) {
    super(game, character, {
      type: "pregnancy",
      name: "Pregnant",
      explanation: "The explanation",
    });
  }
}

export default Pregnancy;
