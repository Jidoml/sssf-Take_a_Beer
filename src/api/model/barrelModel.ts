import mongoose from "mongoose";
import {Barrels} from "../../interfaces/Barrels";

const barrelSchema = new mongoose.Schema<Barrels>({
  price: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  drink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drinks",
    required: true,
  },
  status: {
    string: {
      type: String,
      required: true,
      enum: ["available", "unavailable", "reserved"],
    },
  },
});

export default mongoose.model<Barrels>("Barrels", barrelSchema);
