import { Types, Document} from "mongoose";
import {Drink, testDrink} from './Drink';

interface Barrel extends Document {
  price: number; // in euros
  volume: number; // in liters
  drink: Types.ObjectId | Drink;
  available: boolean;
}

interface testBarrel{
  id?: string;
  price?: number;
  volume?: number;
  drink?: string;
  available?: boolean;
}

export {Barrel, testBarrel};
