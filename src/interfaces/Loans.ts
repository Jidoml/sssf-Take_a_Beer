import {User} from './User';
import {Barrels} from './Barrels';
import {Types} from "mongoose";

interface Loans extends Document {
  loanID: number; // not unique, one loan per user per barrel/barrels,
  user: Types.ObjectId | User;
  barrel: Types.ObjectId | Barrels;
  startDate: Date;
  endDate: Date;
}

export {Loans};
