import { Types, Document} from "mongoose";
import { Drink } from './Drink';

interface Barrels extends Document {
  price: number; // in euros
  volume: number; // in liters
  drink: Types.ObjectId | Drink;
  status: 'available' | 'unavailable' | 'reserved';
}

export {Barrels};
