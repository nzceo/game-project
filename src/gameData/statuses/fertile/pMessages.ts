import Game from "../../game";

export const pMessages = [
  {
    m: "Your period seems to be late.",
    waistStart: 1,
    waistEnd: 3,
  },
  {
    m: "You're feeling nauseous.",
    waistStart: 1,
    waistEnd: 3,
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isFirstPregnancy()) {
        return "You seem to be gaining some weight, you have a slight pot belly. You decide not to pay too much attention to it.";
      } else {
        return "You still haven't gotten your period and your stomach is starting to swell outwards. You know from experience you're probably pregnant again."
      }
    },
    waistStart: 4,
    waistEnd: 8,
  },
  // Around 14 weeks, 33 inches with human
  {
    m: "Your waist has been thickening for a few weeks now. Despite what you've been trying to convince yourself of, there's no denying it anymore, you're pregnant. What are you going to do now?",
    waistStart: 8,
    waistEnd: 12,
    dontActivate: true,
  },
  // Around 21 weeks, 37 inches with human
  {
    m: "Your pregnant belly is even bigger than before and sticks out from your body by about 5 inches, it's pretty clear to anyone that looks at you that you're expecting.",
    waistStart: 12,
    waistEnd: 17,
  },
  // Around 28 weeks, 42 inches with human
  {
    m: "Your pregnant belly is now big enough to become a nuisance, it's become quite heavy and it's starting to get difficult to lug it around everywhere you go. It almost reaches 7 inches in front of you.",
    waistStart: 17,
    waistEnd: 20,
  },
  {
    m: "A dark line that goes from your pubic area and your belly button seems to have appeared, it divides your pregnant belly in two perfectly.",
    waistStart: 15,
    waistEnd: 999,
  },
  {
    m: "Your belly button has recently popped and become an outie. Touching it feels funny and somewhat arousing.",
    waistStart: 16,
    waistEnd: 999,
  },
  // Around 34 weeks, 45 inches with human
  {
    m: "Your belly is huge, you are surprised that it could've grown so much in such a short amount of time. Your baby is getting heavier and heavier by the day and you are really starting to wish you could get this whole thing over with.",
    waistStart: 20,
    waistEnd: 22,
  },
  // Around 40 weeks, 48 inches with human
  {
    m: "Your belly is so big it's getting really hard for you to actually go about your day. The baby is incredibly active and spends most of his time awake kicking you. Your belly sticks out 10 inches in front of you making you look pretty much full-term, you can't imagine your pregnancy lasting that much longer.",
    waistStart: 22,
    waistEnd: 24,
  },
  // Around 31 weeks, 50 inches with orc
  {
    m: "Your belly is so big your body is starting to have trouble dealing with its sheer weight and size. Every single movement you do seems awkward and even the smallest tasks are now extremely complicated. By how much your baby is moving you can tell it wants to get out as soon as possible, but you can't help but be a little worried about the birth, can your body handle it?",
    waistStart: 24,
    waistEnd: 28,
  },
  // Around 37 weeks, 53 inches with orc
  {
    m: "This doesn't feel right, you know you shouldn't be this big. Your belly has grown so big you're having trouble sitting down and sleeping, the weight of it making it hard for you to breathe. You're sore all over and the baby's head is so big between your hips that you've had to resort to walking bow-legged.",
    waistStart: 28,
    waistEnd: 29,
  },
  // Around 38 weeks, 54 inches with orc
  {
    m: "You are now officially overdue. You've been feeling cramps on your lower back and belly for a while now, they come and go irregularly. Your Braxton-Hicks contractions have also become stronger and more frequent.",
    waistStart: 29,
    waistEnd: 999,
  },

  // Dexterity penalties
  {
    m: "With your belly growing bigger by the day you find yourself having a harder time moving around. It's not a huge problem for now, but you wonder how worse it will get the more your womb expands. You get a Dexterity penalty until you have the baby.",
    waistStart: 9,
    waistEnd: 14,
    statPenalty: "size",
  },
  {
    m: "Your belly is now a major nuisance for you, because of its size you find yourself having a much harder time moving around than a few months ago.  You get a Dexterity penalty until you have the baby.",
    waistStart: 14,
    waistEnd: 26,
    statPenalty: "size",
  },
  {
    m: "Honestly, with the size your womb has reached you should not be doing anything at all that involves being quick and agile. Your gravid womb is constantly in the way, it not only slows you down, but it also throws off your balance since it sticks out so far in front of you. You get a Dexterity penalty until you have the baby.",
    waistStart: 26,
    waistEnd: 999,
    statPenalty: "size",
  },

  // Constitution buffs
  {
    m: "Thanks to your advancing condition, your body has started to fatten up in all the right places. Not only you find yourself to have become more curvy, but the extra layer of protection on your bones does wonders for your defense. You get a Constitution bonus until the baby is born.",
    waistStart: 9,
    waistEnd: 14,
    statPenalty: "weight",
  },
  {
    m: "To help protect your developing baby, your body is now covered by a layer of fat that you didn't have before getting pregnant. While some extra protection is nice, you can't help but be a bit angry that the baby has completely taken over your body, leaving you almost no control over these changes. You get a Constitution bonus until the baby is born.",
    waistStart: 14,
    waistEnd: 26,
    statPenalty: "weight",
  },
  {
    m: "Your once taut body is now covered by a thick layer of protective pregnancy fat. Luckily for you the fat you've been gaining is barely noticeable thanks to the gargantuan size your belly has grown to. You get a Constitution bonus until the baby is born.",
    waistStart: 26,
    waistEnd: 999,
    statPenalty: "weight",
  },

  // Strength buffs
  {
    m: "Either because of developing motherly instincts or because your body is getting used to move more weight than usual, your muscles have become stronger. You get a Strength bonus until the baby is born.",
    waistStart: 9,
    waistEnd: 14,
    statPenalty: "weight",
  },
  {
    m: "Thanks to all the pregnancy weight you've been stacking on and because of the pregnancy hormones subconsciously telling you to protect your baby, you find yourself becoming stronger. You get a Strength bonus until the baby is born.",
    waistStart: 14,
    waistEnd: 26,
    statPenalty: "weight",
  },
  {
    m: "Sure, you might feel bad about just how bloated your body feels, especially your stomach, but you have to admit to yourself that the fat brought on by the pregnancy has definitely made you more resistant. You get a Constitution bonus until the baby is born.",
    waistStart: 26,
    waistEnd: 999,
    statPenalty: "weight",
  },
];
