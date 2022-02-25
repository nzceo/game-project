import Game from "../../game";
import { waistIsAbove, sizeMatches } from "./pFuncs";
import Fertile, { IFertilityStatusData } from "./fertile";

export const pMessages = [
  {
    m: "Your period seems to be late.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 1),
  },
  {
    m: "You're feeling nauseous.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 1),
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isFirstPregnancy()) {
        return "You seem to be gaining some weight, you have a slight pot belly. You decide not to pay too much attention to it.";
      } else {
        return "You still haven't gotten your period and your stomach is starting to swell outwards. You know from experience you're probably pregnant again.";
      }
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 2),
  },
  {
    m: "Your waist has been thickening for a few weeks now. As you touch the small roundness that has appeared on your once-flat stomach you finally succumb to what you've been trying to avoid thinking about for so long. You're pregnant, you're not sure when it happened but there's a child growing inside you.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 4),
  },
  {
    m: "Every morning you wake up and your belly looks a bit rounder than the day before. If you wear large enough clothes you can still hide the swell of your tummy, but once your clothes are off you look clearly pregnant. ",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 5),
  },
  {
    m: "As you put on some clothes and get ready for the day you look down below your engorged breasts. Your belly is now obviously protruting from your body, your womb has expanded exponentially and the skin feels warm but hard when you touch it.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 6),
  },
  {
    m: (game: Game) => {
      return [
        "Like every other day for the past couple of weeks you wake up sore and tired. The more your belly grows and the heavier your womb becomes, the harder it is to find a comfortable position to sleep in. As soon as you're on your feet you realise you can't quite stand normally anymore, the ball jutting out of your midsection is so big it forces you to bend your back, pushing out your belly even further.",
        "Throughout the day you find yourself resting your hands on the small of your back to give you some respite over carrying your heavy womb wherever you go, but it doesn't do much to improve the constant discomfort.",
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 8),
  },
  {
    m: (game: Game) => {
      if (
        game.player.fertility.isMultiples() &&
        !game.player.fertility.isKnownMultiples()
      ) {
        return "Your pregnant belly has grown quite a lot. A bit too fast even. You don't remember anyone from the village getting as big as you so quickly. You're not completely sure but you think you can feel more movement than a single baby should be capable of.";
      }
      return "Your pregnant belly has grown quite a lot. A bit too fast even. You don't remember anyone from the village getting as big as you so quickly. Maybe you should go see a doctor.";
    },
    display: (fertile: Fertile) => sizeMatches(fertile, ["large", "veryLarge"]),
  },
  {
    m: "A dark line that goes from your pubic area and your belly button seems to have appeared, it divides your pregnant belly in two perfectly.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 7),
  },
  {
    m: "Your belly button has recently popped and become an outie. Touching it feels funny and somewhat arousing.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 8),
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isMultiples()) {
        return [
          "Your stomach is now big enough to be a nuisance during your daily activities. Your womb's weight and size make it difficult to get up when you're sitting and slow down your movements considerably. As you wake up, you feel kicks at opposite sides of your belly, you gasp as you realise there's more than one baby inside you.",
          "Giving birth to one child is already a lot to think about, but having multiples? You can't even imagine how difficult that's going to be.",
          "You shudder thinking at how big you're going to be in a couple months time.",
        ];
      }
      return [
        "Your stomach is now big enough to be a nuisance during your daily activities. Your womb's weight and size make it difficult to get up when you're sitting and slow down your movements considerably, movements from within have also started increasing in frequency it's hard to go a day without feeling a kick or a punch.",
        "As the weight inside your womb increases you can't quite help yourself from waddling rather than walking.",
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 9),
  },
  {
    m: [
      "As you try to get out of bed you suddenly realize how difficult moving your heavy body has become. Once you're on your feet, you feel your womb shift downwards and its weight settling deep within your pelvis.",
      "You place a hand under your burgeoning stomach and try to lift its weight, it relieves you of some of the enormous pressure you're feeling, but it's only temporary.",
    ],
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 10),
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isMultiples()) {
        return [
          "Your belly is huge, you are surprised that it could've grown so much in such a short amount of time. The babies are getting heavier and heavier by the day and you are really starting to wish you could get this whole thing over with, but you know you're probably not even close to getting them out of you.",
          "As you cup your swelling stomach, it's hard to imagine how much further these babies will stretch you before they're ready to come out.",
        ];
      }
      return [
        "Your belly is huge, you're surprised that it could've grown so much in such a short amount of time. Your baby is getting heavier and heavier by the day and you are really starting to wish you could get this whole thing over with.",
        "Your once flat stomach has been replaced by the round swell of your womb. Not being a local as well as your size and gait attract stares and gazes wherever you go, everyone knows you're not wed and probably don't know the father.",
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 11),
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isMultiples()) {
        return "Your belly is so big it's getting really hard for you to actually go about your day. The babies are very active and spend most of their time awake kicking you. Your belly sticks out 10 inches in front of you making you look pretty much full-term, you can't imagine your pregnancy lasting that much longer.";
      }
      return "Your belly is so big it's getting really hard for you to actually go about your day. The baby is incredibly active and spends most of his time awake kicking you. Your belly sticks out 10 inches in front of you making you look pretty much full-term, you can't imagine your pregnancy lasting that much longer.";
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 12),
  },
  // Add one here
  {
    m: (game: Game) => {
      return [
        "You're huge. Bigger than any pregnant woman you've ever met before. Getting up, sitting down, dressing yourself have all become taxing activities on your swollen frame, each of them needs to be done with extreme carefullness.",
        "When standing up, the weight in your womb is settled low between your legs, causing you to swing your belly left and right with each step.",
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 13),
  },
  {
    m: "Your belly is so big your body is starting to have trouble dealing with its sheer weight and size. Every single movement you do seems awkward and even the smallest tasks are now extremely complicated. By how much your baby is moving you can tell it wants to get out as soon as possible, but you can't help but be a little worried about the birth, can your body handle it?",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 15),
  },
  {
    m: "This doesn't feel right, you know you shouldn't be this big. Your belly has grown so big you're having trouble sitting down and sleeping, the weight of it making it hard for you to breathe. You're sore all over and the baby's head is so big between your hips that you've had to resort to walking bow-legged.",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 16),
  },

  // Dexterity penalties
  //   {
  //     m: "With your belly growing bigger by the day you find yourself having a harder time moving around. It's not a huge problem for now, but you wonder how worse it will get the more your womb expands. You get a Dexterity penalty until you have the baby.",
  //     waistStart: 9,
  //     waistEnd: 14,
  //     statPenalty: "size",
  //   },
  //   {
  //     m: "Your belly is now a major nuisance for you, because of its size you find yourself having a much harder time moving around than a few months ago.  You get a Dexterity penalty until you have the baby.",
  //     waistStart: 14,
  //     waistEnd: 26,
  //     statPenalty: "size",
  //   },
  //   {
  //     m: "Honestly, with the size your womb has reached you should not be doing anything at all that involves being quick and agile. Your gravid womb is constantly in the way, it not only slows you down, but it also throws off your balance since it sticks out so far in front of you. You get a Dexterity penalty until you have the baby.",
  //     waistStart: 26,
  //     waistEnd: 999,
  //     statPenalty: "size",
  //   },

  //   // Constitution buffs
  //   {
  //     m: "Thanks to your advancing condition, your body has started to fatten up in all the right places. Not only you find yourself to have become more curvy, but the extra layer of protection on your bones does wonders for your defense. You get a Constitution bonus until the baby is born.",
  //     waistStart: 9,
  //     waistEnd: 14,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "To help protect your developing baby, your body is now covered by a layer of fat that you didn't have before getting pregnant. While some extra protection is nice, you can't help but be a bit angry that the baby has completely taken over your body, leaving you almost no control over these changes. You get a Constitution bonus until the baby is born.",
  //     waistStart: 14,
  //     waistEnd: 26,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "Your once taut body is now covered by a thick layer of protective pregnancy fat. Luckily for you the fat you've been gaining is barely noticeable thanks to the gargantuan size your belly has grown to. You get a Constitution bonus until the baby is born.",
  //     waistStart: 26,
  //     waistEnd: 999,
  //     statPenalty: "weight",
  //   },

  //   // Strength buffs
  //   {
  //     m: "Either because of developing motherly instincts or because your body is getting used to move more weight than usual, your muscles have become stronger. You get a Strength bonus until the baby is born.",
  //     waistStart: 9,
  //     waistEnd: 14,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "Thanks to all the pregnancy weight you've been stacking on and because of the pregnancy hormones subconsciously telling you to protect your baby, you find yourself becoming stronger. You get a Strength bonus until the baby is born.",
  //     waistStart: 14,
  //     waistEnd: 26,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "Sure, you might feel bad about just how bloated your body feels, especially your stomach, but you have to admit to yourself that the fat brought on by the pregnancy has definitely made you more resistant. You get a Constitution bonus until the baby is born.",
  //     waistStart: 26,
  //     waistEnd: 999,
  //     statPenalty: "weight",
  //   },
];
