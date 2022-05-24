import RPG from "ts-rpg-framework";

const { Status } = RPG;

class ExtendedStatus extends Status {
  /**
   * Runs each day
   */
  eachDay() {}
}

export default ExtendedStatus;
