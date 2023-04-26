import {GraphQLError} from "graphql";
import {Loans} from "../../interfaces/Loans";
import loanModel from "../model/loanModel";
import mongoose from "mongoose";

export default {
  Query: {
    loans: async () => {
      return loanModel.find();
    },
    loanById: async (_parent: unknown, args: Loans) => {
      return loanModel.findById(args.loanID);
    },
  },
  Mutation: {
    createLoan: async (_parent: unknown, args: Loans) => {
      //TODO: add user and barrels to loan
      const loan = new loanModel(args);
      return loan.save();
    },
    updateLoan: async (_parent: unknown, args: Loans) => {
      //TODO: check token and if user can update loan

      return loanModel.findByIdAndUpdate(args.loanID, args, {new: true});
    },
    deleteLoan: async (_parent: unknown, args: Loans) => {
      //TODO: check token and if user can delete loan

      return loanModel.findByIdAndDelete(args.loanID);
    }
  }
}
