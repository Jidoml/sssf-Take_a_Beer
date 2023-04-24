import { Types, Document} from "mongoose";
import { Drinks } from './Drinks';

interface Barrels extends Document {
  price: number; // in euros
  volume: number; // in liters
  drink: Types.ObjectId | Drinks;
  status: 'available' | 'unavailable' | 'reserved';
}

export {Barrels};
