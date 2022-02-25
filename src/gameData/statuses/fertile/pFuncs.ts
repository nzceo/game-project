import { pProgression } from "./pProgression";
import { pMessages } from "./pMessages";
import { FType } from "./fTypes";
import Game from "../../game";
import Fertile, { IFertilityStatusData, PregnancyInterface } from "./fertile";
import { isFunction, isArray } from "lodash";

function returnPregTerm(weeks: number): "first" | "second" | "third" | "late" {
  if (weeks < 12) {
    return "first";
  } else if (weeks >= 12 && weeks < 24) {
    return "second";
  } else if (weeks >= 24 && weeks < 36) {
    return "third";
  } else {
    return "late";
  }
}


export function returnPregCalc(pregnancy: PregnancyInterface) {
  const days = 1;
  pregnancy.progressDays += days;
  pregnancy.progressWeeks = Math.floor(pregnancy.progressDays / 7);

  if (pregnancy.progressWeeks > 0) {
    pregnancy.inches +=
      ((((pProgression[pregnancy.progressWeeks].inches -
        pProgression[pregnancy.progressWeeks - 1].inches) /
        7) *
        days) /
        100) *
      (pregnancy.fetusType.sizeIncrease *
        pregnancy.babies *
        pregnancy.fetusType.multiples[pregnancy.babies].size);
    pregnancy.weight +=
      ((((pProgression[pregnancy.progressWeeks].weight -
        pProgression[pregnancy.progressWeeks - 1].weight) /
        7) *
        days) /
        100) *
        pregnancy.fetusType.weightIncrease +
      (2 / 294) * days +
      (2 / 294) * days +
      (2 / 294) * days +
      (2.6 / 294) * days +
      (2.6 / 294) * days +
      (1 / 294) * days +
      (9 / 294) * days;
  }

  return pregnancy;
}

// export function advancePreg(days: number) {
//   const { player } = playerStore.getState();

//   let pregnancy = { ...player?.pregnancy! };
//   let seenAlerts = [...player?.pregnancy?.seenAlerts!];
//   let stats = { ...player?.stats! };

//   let i = 0;
//   let newMessages: any[] = [];
//   let passedDays = days;
//   while (i < days) {
//     passedDays--;
//     const newData = returnPregCalc(pregnancy, stats);

//     pregnancy = newData.pregnancy;
//     stats = newData.stats;

//     // eslint-disable-next-line
//     newMessages = returnPregnancyMessages(player, pregnancy);

//     if (newMessages.length) break;
//     i++;
//   }

//   const flags = playerStore.getState().player?.flags!;

//   console.log(newMessages.map((message) => ({ description: message })));

//   uiStore.setState({
//     story: [
//       ...uiStore.getState().story,
//       ...newMessages.map((message) => ({ description: message })),
//     ],
//   });

//   const averageSize = calculateAverageSize(
//     pregnancy.progressDays,
//     pregnancy.inches
//   );

//   const pregTerm = returnPregTerm(pregnancy.progressWeeks);

//   playerStore.setState({
//     player: {
//       ...player,
//       // @ts-ignore
//       pregnancy: {
//         ...pregnancy,
//         seenAlerts: [...seenAlerts, ...newMessages],
//         known: pregnancy.inches > 8 ? true : false,
//       },
//       // @ts-ignore
//       stats,
//       flags: {
//         ...flags,
//         pregInches: pregnancy.inches!,
//         fetusType: pregnancy.fetus.type,
//         averageSize,
//         pregTerm,
//       },
//     } as PlayerState["player"],
//   });

//   // const armor = calculateArmorFit(bodyState);
//   // return { pregnancy, stats, bodyState };
// }

// function calculateArmorFit(bodyState) {
//   let armor = { ...player.equip.armor };
//   // console.log(publicPlayer.equip.armor.options[bodyState]);
//   if (armor.options && armor.options[bodyState].wearable === false) {
//     armor = {};
//   }
//   return armor;
// }

export function returnPregnancyProgressMessages(
  game: Game,
  fertile: Fertile,
  seenAlerts: string[]
) {
  let messages: any[] = [];
  let filteredAlerts: any[] = [...seenAlerts];
  pMessages.forEach(function (entry) {
    if (entry.display(fertile)) {
      let entryOutput;

      if (isFunction(entry.m)) {
        entryOutput = entry.m(game);
      } else {
        entryOutput = entry.m;
      }

      let entryMessages: string[] = [];

      if (!isArray(entryOutput)) {
        entryMessages = [entryOutput];
      } else {
        entryMessages = entryOutput;
      }

      entryMessages.forEach((message) => {
        const isAlreadySeen = seenAlerts?.includes(message);

        if (!isAlreadySeen) {
          messages.push(message);
          filteredAlerts.push(message);
        }
      });
    }
  });
  return { messages, filteredAlerts };
}

export const waistIsAbove = (
  fertility: IFertilityStatusData,
  waist: number
): boolean => {
  return waist > parseFloat(fertility.pregnancy?.inches!.toFixed(2));
};

export const sizeMatches = (fertile: Fertile, sizes: string[]) => {
  let currentDay = 0;
  let averageSize = 0;
  while (currentDay <= fertile.statusData.pregnancy.progressDays) {
    averageSize = pProgression[Math.floor(currentDay / 7)].inches;

    currentDay++;
  }

  const currentInches = fertile.statusData.pregnancy.inches;

  let sizeResult;
  if (currentInches - averageSize >= 3) {
    sizeResult = "large";
  } else if (currentInches - averageSize > 5) {
    sizeResult = "veryLarge";
  } else if (
    currentInches - averageSize < 5 &&
    currentInches - averageSize >= 0
  ) {
    sizeResult = "average";
  } else if (currentInches - averageSize < 0) {
    sizeResult = "small";
  } else {
    sizeResult = "average";
  }
  

  return sizes.includes(sizeResult);
};
