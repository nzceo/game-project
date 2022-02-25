import Status from "../";
import { pMessages } from "./pMessages";
import { returnPregCalc, returnPregnancyProgressMessages } from "./pFuncs";
import { fType, FType } from "./fTypes";
import { isArray } from "lodash";
import Game from "../../game";

export interface IFertilityStatusData {
  initialised: boolean;
  isPregnant: boolean;
  cycleProgress: number;
  fertility: number;
  body: {
    height: number;
    weightBase: number;
    waistBase: number;
    weight: number;
    waist: number;
  };
  pregnancies: number;
  births: number;
  pregnancy: PregnancyInterface;
}

export interface PregnancyInterface {
  known: boolean;
  progressDays: number;
  progressWeeks: number;
  publicProgressWeeks: number;
  babies: number;
  publicBabies: number;
  publicFetus: string;
  fetusType: FType;
  inches: number;
  weight: number;
  seenAlerts: string[];
}

class Fertile extends Status {
  constructor(game: any, character: any) {
    super(game, character, {
      type: "fertile",
      name: "Fertile",
      explanation: "The explanation",
    });

    this.init();
  }

  /**
   * Initialise the status, sets data only if status has never been initialised
   */
  init() {
    if (!this.statusData.initialised) {
      this.statusData = {
        initialised: true,
        isPregnant: false,
        // start follicular
        cycleProgress: 5,
        // out of 100
        fertility: 20,
        body: {
          height: 5.4,
          weightBase: 138,
          waistBase: 25,
          weight: 138,
          waist: 25,
        },
        pregnancies: 0,
        births: 0,
        pregnancy: {
          known: false,
          progressDays: 0,
          progressWeeks: 0,
          publicProgressWeeks: 0,
          babies: 0,
          publicBabies: 0,
          publicFetus: "",
          fetus: {},
          fetuses: [],
          inches: 0,
          weight: 0,
          seenAlerts: [],
        },
      };
    }
  }

  eachDay() {
    this.progressCycle();
    this.progressPregnancy();
  }

  progressCycle() {
    if (!this.statusData.isPregnant) {
      this.statusData = {
        cycleProgress: this.statusData.cycleProgress + 1,
      };

      if (
        this.statusData.cycleProgress >= 0 &&
        this.statusData.cycleProgress < 5
      ) {
        this.statusData = {
          fertility: 0,
        };
      } else if (
        this.statusData.cycleProgress >= 5 &&
        this.statusData.cycleProgress < 11
      ) {
        this.statusData = {
          fertility: 20,
        };
      } else if (
        this.statusData.cycleProgress >= 11 &&
        this.statusData.cycleProgress < 14
      ) {
        this.statusData = {
          fertility: 85,
        };
      } else if (
        this.statusData.cycleProgress >= 14 &&
        this.statusData.cycleProgress < 15
      ) {
        this.statusData = {
          fertility: 75,
        };
      } else if (
        this.statusData.cycleProgress >= 15 &&
        this.statusData.cycleProgress < 18
      ) {
        this.statusData = {
          fertility: 65,
        };
      } else if (
        this.statusData.cycleProgress >= 18 &&
        this.statusData.cycleProgress < 29
      ) {
        this.statusData = {
          fertility: 35,
        };
      } else if (this.statusData.cycleProgress >= 29) {
        this.statusData = {
          cycleProgress: 0,
        };

        this.progressCycle();
      }
    } else {
      this.statusData = {
        cycleProgress: 5,
        fertility: 20,
      };
    }
  }

  progressPregnancy() {
    if (this.isPregnant()) {
      this.statusData = {
        pregnancy: returnPregCalc(this.statusData.pregnancy),
      };
      const progressAlerts = returnPregnancyProgressMessages(
        this.game as Game,
        this,
        this.statusData.pregnancy.seenAlerts
      );
      this.statusData = {
        pregnancy: {
          ...this.statusData.pregnancy,
          seenAlerts: progressAlerts.filteredAlerts,
        },
      };
      progressAlerts.messages.forEach((alert) => {
        if (isArray(alert)) {
          alert.forEach((a) => {
            this.game.extraDisplay.push({ text: a, type: "flavor" });
          });
        } else {
          this.game.extraDisplay.push({ text: alert, type: "flavor" });
        }
      });
      // console.log(
      //   `at ${this.statusData.pregnancy.progressDays} your belly is ${
      //     this.statusData.pregnancy.inches + this.statusData.body.waist
      //   }(+${this.statusData.pregnancy.inches})`
      // );
      // console.log(
      //   `at ${this.statusData.pregnancy.progressDays} your weight is ${
      //     this.statusData.pregnancy.weight + this.statusData.body.weight
      //   }lb (+${this.statusData.pregnancy.weight}lb)`
      // );
    }
  }

  isPregnant() {
    return this.statusData.isPregnant;
  }

  isFirstPregnancy() {
    return this.statusData.pregnancies === 0;
  }

  get fetusType() {
    return this.statusData.pregnancy.fetusType.type;
  }

  /**
   * Returns true if pregnant with 2 or more babies
   */
  isMultiples() {
    return this.statusData.pregnancy.babies > 1;
  }

  /**
   * Returns true if character knows they're pregnant with 2 or more babies
   */
  isKnownMultiples() {
    return this.statusData.pregnancy.publicBabies > 1;
  }
}

export default Fertile;
