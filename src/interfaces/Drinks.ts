interface Drinks extends Document {
  name: string;
  alcoholic: boolean;
  amountOfAlcohol: number;
  brewery: string;
  description: string;
  type: string;
  IBU: number;
}

export {Drinks};
