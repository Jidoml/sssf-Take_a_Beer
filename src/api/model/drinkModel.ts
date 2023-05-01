import mongoose from "mongoose";
import {Drink} from "../../interfaces/Drink";

const drinkModel = new mongoose.Schema<Drink>({
  name: {
    type: String,
    required: true,
  },
  amountOfAlcohol: {
    type: Number,
    required: true,
  },
  brewery: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  IBU: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Drink>("Drink", drinkModel);
