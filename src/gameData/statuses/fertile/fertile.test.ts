import Fertile from "./";
import Game from "../../game";
import { config } from "../../../config";
import { cloneDeep } from "lodash";
import { fType } from "./fTypes";

const pState = {
  player: {
    statuses: {
      fertile: {
        initialised: true,
        isPregnant: true,
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
          babies: 1,
          publicBabies: 0,
          publicFetus: "",
          fetusType: fType.human,
          fetuses: [],
          inches: 0,
          weight: 0,
          seenAlerts: [],
        },
      },
    },
  },
};

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

    game.sleep(9);

    expect(player.statuses[0].statusData.cycleProgress).toBe(14);
    expect(player.statuses[0].statusData.fertility).toBe(75);

    game.sleep(20);

    expect(player.statuses[0].statusData.cycleProgress).toBe(6);
    expect(player.statuses[0].statusData.fertility).toBe(20);
  });

  it("progression works", () => {
    localStorage.setItem("state", JSON.stringify(pState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("fertile");

    expect(player.statuses[0].statusData.isPregnant).toBe(true);

    game.sleep(20);

    expect(player.statuses[0].statusData.pregnancy.inches).toBeGreaterThan(0);
  });

  it("progression alerts appear", () => {
    localStorage.setItem("state", JSON.stringify(pState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.addStatus("fertile");

    expect(player.statuses[0].statusData.isPregnant).toBe(true);

    game.sleep(100);

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        { text: "Your period seems to be late.", type: "flavor" },
        { text: "You're feeling nauseous.", type: "flavor" },
        {
          text: "You seem to be gaining some weight, you have a slight pot belly. You decide not to pay too much attention to it.",
          type: "flavor",
        },
      ])
    );
  });
  it("different progression alert depending on being pregnant before", () => {
    const tempPState = cloneDeep(pState);
    tempPState.player.statuses.fertile.pregnancies = 1;
    localStorage.setItem("state", JSON.stringify(tempPState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    expect(player.statuses[0].statusData.isPregnant).toBe(true);

    game.sleep(100);

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        {
          text: "You still haven't gotten your period and your stomach is starting to swell outwards. You know from experience you're probably pregnant again.",
          type: "flavor",
        },
      ])
    );
  });
  it("different progression alert if child is larger", () => {
    const tempPState = cloneDeep(pState);
    tempPState.player.statuses.fertile.pregnancy.fetusType = fType.orc;
    tempPState.player.statuses.fertile.pregnancy.babies = 1;
    localStorage.setItem("state", JSON.stringify(tempPState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    expect(player.statuses[0].statusData.isPregnant).toBe(true);

    game.sleep(155);

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        {
          text: "Your pregnant belly has grown quite a lot. A bit too fast even. You don't remember anyone from the village getting as big as you so quickly. Maybe you should go see a doctor.",
          type: "flavor",
        },
      ])
    );
  });
  it("different progression alert if child is larger and multiples", () => {
    const tempPState = cloneDeep(pState);
    tempPState.player.statuses.fertile.pregnancy.fetusType = fType.orc;
    tempPState.player.statuses.fertile.pregnancy.babies = 2;
    localStorage.setItem("state", JSON.stringify(tempPState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    expect(player.statuses[0].statusData.isPregnant).toBe(true);

    game.sleep(155);

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        {
          text: "Your pregnant belly has grown quite a lot. A bit too fast even. You don't remember anyone from the village getting as big as you so quickly. You're not completely sure but you think you can feel more movement than a single baby should be capable of.",
          type: "flavor",
        },
      ])
    );
  });
  it("generates fetuses array if non-existing", () => {
    const tempPState = cloneDeep(pState);
    tempPState.player.statuses.fertile.pregnancy.fetusType = fType.orc;
    tempPState.player.statuses.fertile.pregnancy.babies = 2;
    localStorage.setItem("state", JSON.stringify(tempPState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    expect(player.statuses[0].statusData.pregnancy.fetuses.length).toBe(0);

    game.sleep(1);

    expect(player.statuses[0].statusData.pregnancy.fetuses.length).toBe(2);
  });
  it("fetus weight progresses", () => {
    const tempPState = cloneDeep(pState);
    tempPState.player.statuses.fertile.pregnancy.fetusType = fType.goblin;
    tempPState.player.statuses.fertile.pregnancy.babies = 3;
    localStorage.setItem("state", JSON.stringify(tempPState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    game.sleep(
      fType[tempPState.player.statuses.fertile.pregnancy.fetusType.type]
        .multiples[tempPState.player.statuses.fertile.pregnancy.babies].duration
    );

    expect(
      player.statuses[0].statusData.pregnancy.fetuses[0].weight
    ).toBeGreaterThan(0);
  });
  it("weight increases and displays once pregnancy is known", () => {
    const tempPState = cloneDeep(pState);
    tempPState.player.statuses.fertile.pregnancy.fetusType = fType.human;
    tempPState.player.statuses.fertile.pregnancy.babies = 1;
    localStorage.setItem("state", JSON.stringify(tempPState));
    // @ts-ignore
    const game = new Game(config);
    game.load();
    const player = game.player;

    game.sleep(30);

    expect(player.fertility.weight).toBe(`138lb`);

    game.sleep(111);

    expect(player.fertility.weight).toContain(`+`);
  });
  //   it("test", () => {
  //     const tempPState = cloneDeep(pState);
  //     tempPState.player.statuses.fertile.pregnancy.fetusType = fType.human;
  //     tempPState.player.statuses.fertile.pregnancy.babies = 1;
  //     localStorage.setItem("state", JSON.stringify(tempPState));
  //     // @ts-ignore
  //     const game = new Game(config);
  //     game.load();
  //     const player = game.player;

  //     game.sleep(
  //       fType[tempPState.player.statuses.fertile.pregnancy.fetusType.type]
  //         .multiples[tempPState.player.statuses.fertile.pregnancy.babies].duration
  //     );
  //   });
});
