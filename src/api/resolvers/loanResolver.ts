import {GraphQLError} from "graphql";
import {Loans} from "../../interfaces/Loans";
import loanModel from "../model/loanModel";
import mongoose from "mongoose";
import {UserIdWithToken} from "../../interfaces/User";

export default {
  Query: {
    loans: async () => {
      return loanModel.find();
    },
    loanById: async (_parent: unknown, args: Loans) => {
      return loanModel.findById(args.loanID);
    },
    loanByOwner: async (_parent: unknown, args: UserIdWithToken) => {
      return loanModel.find({user: args.id});
    }
  },
  Mutation: {
    createLoan: async (_parent: unknown, args: Loans, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      args.user = user.id as unknown as mongoose.Types.ObjectId
      const loan = new loanModel(args);
      return loan.save();
    },
    updateLoan: async (_parent: unknown, args: Loans, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      const loan = await loanModel.findById(args.loanID);
      if(loan?.user.toJSON().toString() !== user.id || user.role !== 'admin') {
        throw new GraphQLError('Not owner or admin', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      return loanModel.findByIdAndUpdate(args.loanID, args, {new: true});
    },
    deleteLoan: async (_parent: unknown, args: Loans, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      const loan = await loanModel.findById(args.loanID);
      if(loan?.user.toJSON().toString() !== user.id || user.role !== 'admin') {
        throw new GraphQLError('Not owner or admin', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      return loanModel.findByIdAndDelete(args.loanID);
    }
  }
}
