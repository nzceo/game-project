import Game from "../game";
import { IDialog, ITurn } from "ts-rpg-framework/dist/core/types";

/**
 * The game's render function. This will be called every turn.
 * Add new switches and use the game class to output
 * new things.
 */
const render = (game: Game): ITurn => {
  switch (game.player.state) {
    default:
    case "normal":
      /**
       * We ensure we also get actor descriptions when describing a map
       * Unsure if this should be here, I also don't like the hardcoded state.
       */
      if (game.player.map.actors.length > 0) {
        game.extraDisplay.push({
          text: `You see the following characters:`,
          type: "flavor"
        });
        game.player.map.actors.forEach((actor) => {
          actor.describe();
        });
      }

      console.log({
        extraDisplay: game.extraDisplay,
        state: game.player.state
      });
      return {
        display: [
          { text: `You are in ${game.player.map.name}.`, type: "flavor" },
          ...game.extraDisplay
        ],
        options: [
          ...game.player.map.connections.map((connection) => {
            return {
              text: `Go to ${connection.name}`,
              action: () => {
                connection.travelTo();
              }
            };
          }),
          ...game.player.map.actors.map((actor) => {
            return {
              text: `Talk to ${actor.name}`,
              action: () => {
                actor.talkTo();
              }
            };
          }),
          ...game.extraOptions
        ]
      };
    case "dialog":
      const currentDialog = game.player.dialog.returnDialog(
        game.player.getState("data").dialogRef
      );
      const currentMessages: ITurn["display"] = currentDialog.map((dialog) => {
        return { text: dialog.message, type: "flavor" };
      });
      const lastDialog = currentDialog[currentDialog.length - 1] as IDialog;
      let currentOptionsIfAny: ITurn["options"] = [];
      if (lastDialog.type === "question") {
        currentOptionsIfAny = lastDialog.options.map((option) => {
          return {
            text: option.action,
            action: () => {
              game.player.dialog.updateDialogRef(option.next);
            }
          };
        });
      }

      // This will render map options when dialog ends
      let dialogEndOptions: ITurn["options"] = [];
      if (!game.player.getState("data").dialogRef) {
        dialogEndOptions = [...game.turn().options];
      }

      return {
        display: [...currentMessages, ...game.extraDisplay],
        options: [
          ...currentOptionsIfAny,
          ...game.extraOptions,
          ...dialogEndOptions
        ]
      };
    case "combat":
      const currentEnemies: ITurn["display"] = game.enemyData.map((enemy) => {
        return {
          text: `You are fighting ${enemy.name}. ${enemy.returnDescription()} ${
            enemy.pronoun
          } has ${enemy.health}HP left.`,
          type: "flavor"
        };
      });
      const attackOptions = game.enemyData.map((enemy) => {
        return {
          text: `Attack ${enemy.name}`,
          action: () => {
            // enemy.attack(game.player, "oneHanded");
          }
        };
      });
      return {
        display: [
          ...game.extraDisplay,
          {
            text: `You have ${game.player.health}HP left.`,
            type: "flavor"
          },
          ...currentEnemies
        ],
        options: [...game.extraOptions, ...attackOptions]
      };
    case "gameOver":
      return {
        display: [
          ...game.extraDisplay,
          {
            text: `Game Over!`,
            type: "flavor"
          }
        ],
        options: [
          {
            text: "Start from last checkpoint",
            action: () => {
              game.player.switchState("normal");
              game.player.setState(
                "combat.hitPoints.current",
                game.player.getState("combat.hitPoints.base")
              );
              game.player.travelTo(game.player.getState("data").checkpointRef);
            }
          }
        ]
      };
  }
};

export default render;
