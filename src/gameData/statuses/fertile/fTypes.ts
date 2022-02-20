
export interface FType {
  type: "Human" | "Orc";
  sizeIncrease: number;
  weightIncrease: number;
  strength: string;
  movement: string;
  menuText: {
    single: string;
    multiple: string;
  };
}


export const fType: {
  [key: string]: FType;
} = {
  human: {
    type: "Human",
    sizeIncrease: 100,
    weightIncrease: 100,
    strength: "normal",
    movement: "normal",
    menuText: { single: "a human child", multiple: "human children" }
  },
  orc: {
    type: "Orc",
    sizeIncrease: 130,
    weightIncrease: 200,
    strength: "high",
    movement: "high",
    menuText: { single: "an orc child", multiple: "orcish children" }
  }
};