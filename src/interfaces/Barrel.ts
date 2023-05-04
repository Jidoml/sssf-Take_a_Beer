import { Types, Document} from "mongoose";
import { Drink } from './Drink';

interface Barrel extends Document {
  price: number; // in euros
  volume: number; // in liters
  drink: Types.ObjectId | Drink;
  available: boolean;
}

export {Barrel};
