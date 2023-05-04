import mongoose from "mongoose";
import {Barrel} from "../../interfaces/Barrel";

const barrelSchema = new mongoose.Schema<Barrel>({
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
    ref: "Drink",
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.model<Barrel>("Barrels", barrelSchema);
