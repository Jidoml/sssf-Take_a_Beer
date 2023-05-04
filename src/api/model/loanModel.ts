import mongoose from "mongoose";
import {Loans} from "../../interfaces/Loans";

const loanSchema = new mongoose.Schema<Loans>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  barrel: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Barrel",
    required: true,
  },
  pickUp: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Loans>("Loans", loanSchema);
