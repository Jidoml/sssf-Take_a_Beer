import mongoose from "mongoose";
import {Drinks} from "../../interfaces/Drinks";

const drinkSchema = new mongoose.Schema<Drinks>({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  alcoholic: {
    type: Boolean,
    required: true,
  },
  amountOfAlcohol: {
    type: Number,
    required: true,
  },
  brewery: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  IBU: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Drinks>("Drinks", drinkSchema);
