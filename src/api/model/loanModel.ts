import mongoose from "mongoose";
import {Loans} from "../../interfaces/Loans";

const loanSchema = new mongoose.Schema<Loans>({
  loanID: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  barrel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barrels",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<Loans>("Loans", loanSchema);
