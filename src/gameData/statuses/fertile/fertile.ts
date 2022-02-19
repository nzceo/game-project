import Status from "../";

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
      };
    }
  }

  eachDay() {
    this.progressCycle();
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
    }
  }
}

export default Fertile;
