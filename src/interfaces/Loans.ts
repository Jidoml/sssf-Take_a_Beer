import {User} from './User';
import {Barrel} from './Barrel';
import {Types} from "mongoose";

interface Loans extends Document {
  user: Types.ObjectId | User;
  pickUp: string;
  barrel: Types.ObjectId[] | Barrel[];
}

export {Loans};
