import { pProgression } from "./pProgression";
import { pMessages } from "./pMessages";
import { FType } from "./fTypes";

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

function calculateAverageSize(
  progressDays: number,
  currentInches: number
): string {
  let currentDay = 0;
  let averageSize = 0;
  while (currentDay <= progressDays) {
    averageSize = pProgression[Math.floor(currentDay / 7)].inches;

    currentDay++;
  }

  let sizeResult;
  if (currentInches - averageSize >= 5) {
    sizeResult = "large";
  } else if (currentInches - averageSize > 10) {
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

  console.log(
    `Average size for ${currentDay} days is ${averageSize} inches. You are ${currentInches}, which classes you as ${sizeResult}`
  );

  return sizeResult;
}

export interface PregnancyInterface {
  known: boolean;
  progressDays: number;
  progressWeeks: number;
  publicProgressWeeks: number;
  babies: number;
  publicBabies: number;
  publicFetus: string;
  fetus: FType;
  inches: number;
  weight: number;
}

export function returnPregCalc(pregnancy: PregnancyInterface) {
  const days = 1;
  pregnancy.progressDays += days;
  pregnancy.progressWeeks = Math.floor(pregnancy.progressDays / 7);

  if (pregnancy.progressWeeks > 0) {
    pregnancy.inches +=
      (((((pProgression[pregnancy.progressWeeks].inches -
        pProgression[pregnancy.progressWeeks - 1].inches) /
        7) *
        days) /
        100) *
        pregnancy.fetus.sizeIncrease) /
      100;
    pregnancy.weight +=
      ((((pProgression[pregnancy.progressWeeks].weight -
        pProgression[pregnancy.progressWeeks - 1].weight) /
        7) *
        days) /
        100) *
        pregnancy.fetus.weightIncrease +
      (2 / 294) * days +
      (2 / 294) * days +
      (2 / 294) * days +
      (2.6 / 294) * days +
      (2.6 / 294) * days +
      (1 / 294) * days +
      (9 / 294) * days;
  }

  console.log(pregnancy);

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

// export function returnPregnancyMessages(
//   player: PlayerState["player"],
//   pregnancy: PregnancyInterface
// ) {
//   // const { player } = playerStore.getState();
//   let messages: any[] = [];
//   pregnancyMessages.forEach(function (entry) {
//     if (
//       entry.pregnancyWaistSizeStart + player?.age?.waistSize! <
//         parseFloat((player?.age?.waistSize! + pregnancy?.inches!).toFixed(2)) &&
//       entry.pregnancyWaistSizeEnd + player?.age?.waistSize! >
//         parseFloat((player?.age?.waistSize! + pregnancy?.inches!).toFixed(2))
//     ) {
//       const seenAlerts = playerStore.getState().player?.pregnancy.seenAlerts;

//       const isAlreadySeen = seenAlerts?.includes(entry.m);

//       if (!isAlreadySeen) {
//         messages.push(entry.m);
//       }
//     }
//   });
//   return messages;
// }
