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
    ref: "Drink",
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.model<Barrels>("Barrels", barrelSchema);
