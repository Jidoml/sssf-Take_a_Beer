interface Drink extends Document {
  name: string;
  amountOfAlcohol: number;
  brewery: string;
  description: string;
  image: string;
  type: string;
  IBU: number;
}

interface testDrink {
  id?: string;
  name?: string;
  amountOfAlcohol?: number;
  brewery?: string;
  description?: string;
  image?: string;
  type?: string;
  ibu?: number;
}

export {Drink, testDrink};
