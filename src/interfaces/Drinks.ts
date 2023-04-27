interface Drinks extends Document {
  name: string;
  alcoholic: boolean;
  amountOfAlcohol: number;
  brewery: string;
  description: string;
  image: string;
  type: string;
  IBU: number;
}

export {Drinks};
