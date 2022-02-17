import React, { useEffect, useState } from "react";
import RPG from "create-rpg";
import { ITurn } from "create-rpg/dist/core/types";
import townMaps from "../../gameData/maps/town";
import levels from "../../gameData/levels";
import stats from "../../gameData/stats";
import archetypes from "../../gameData/archetypes";
import weapons from "../../gameData/weapons";
import armors from "../../gameData/armors";

const { Game } = RPG;

const useGame = () => {
  console.log(townMaps);
  const [gameCounter, setGameCounter] = useState(0);
  const [gameState, setGameState] = useState<ITurn>({
    display: [],
    options: [],
  });
  const gameRef = React.useRef<any | undefined>();

  React.useEffect(() => {
    gameRef.current = new Game({
      maps: [...townMaps],
      defaultMap: townMaps[0],
      defaultWeapon: weapons.unarmed,
      defaultArmor: armors.clothes,
      player: {
        name: "Hero",
        dialogRef: "",
        mapRef: townMaps[0].id,
        checkpointRef: townMaps[0].id,
        experience: {
          ...levels[0],
          current: 0,
        },
        levelData: levels,
        combat: stats.strong,
        description: archetypes.player,
      },
      governingStats: {
        unarmed: "strength",
        oneHanded: "dexterity",
        ranged: "dexterity",
        twoHanded: "strength",
        poles: "dexterity",
        occult: "intelligence",
        lockPick: "perception",
        speech: "charisma",
        barter: "charisma",
        tinkering: "intelligence",
      },
      statuses: {},
      quests: {},
      // classes: {
      //   player: RPG.Player,
      //   actor: RPG.Actor,
      //   character: RPG.Character,
      //   map: RPG.Map,
      //   quest: RPG.Quest,
      //   status: RPG.Status,
      // },
    });

    /**
     * Populate initial state
     */
    setGameState({
      display: [{ text: "Welcome to the game.", type: "flavor" }],
      options: [
        {
          text: "Load",
          action: () => {
            gameRef.current!.load();
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            increaseGameCounter();
          },
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseGameCounter = () => {
    setGameCounter(gameCounter + 1);
  };

  useEffect(() => {
    if (gameCounter > 0) {
      setGameState(gameRef.current!.turn());
    }
  }, [gameCounter]);

  return {
    gameState,
    turn: increaseGameCounter,
  };
};

export default useGame;
