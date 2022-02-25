import { pProgression } from "./pProgression";
import { pMessages } from "./pMessages";
import { FType } from "./fTypes";
import Game from "../../game";
import Fertile, { IFertilityStatusData, PregnancyInterface } from "./fertile";
import { solveCubicBezier } from "./bezier";
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

const returnInchPerGrowthProgression = (
  progressDays: number,
  fetusType: any,
  babies: number
) => {
  const relativeProgress = progressDays / fetusType.multiples[babies].duration;

  const curve = fetusType.growthCurve;

  // relative progress mapped to growth curve
  const growth = solveCubicBezier(
    0,
    curve[1],
    curve[3],
    1,
    relativeProgress
  )[0];

  // Will reach 14ish when progress 1
  const inchesAtProgress =
    ((12 * growth) / 105) *
    // Apply race multipliers and multiples multipliers
    (fetusType.sizeIncrease * babies * fetusType.multiples[babies].size);

  return inchesAtProgress;
};

export function returnPregCalc(pregnancy: PregnancyInterface) {
  const days = 1;
  pregnancy.progressDays += days;
  pregnancy.progressWeeks = Math.floor(pregnancy.progressDays / 7);

  if (pregnancy.progressWeeks > 0) {
    pregnancy.inches += returnInchPerGrowthProgression(
      pregnancy.progressDays,
      pregnancy.fetusType,
      pregnancy.babies
    );
  }

  return pregnancy;
}

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
  const pregnancy = fertile.statusData.pregnancy;
  
  while (currentDay <= fertile.statusData.pregnancy.progressDays) {
    averageSize = returnInchPerGrowthProgression(
      pregnancy.progressDays,
      pregnancy.fetusType,
      pregnancy.babies
    );

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

  console.log(sizeResult, currentInches - averageSize);

  return sizes.includes(sizeResult);
};
