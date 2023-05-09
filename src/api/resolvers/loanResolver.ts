import {GraphQLError} from "graphql";
import {Loans} from "../../interfaces/Loans";
import loanModel from "../model/loanModel";
import mongoose, {Types} from "mongoose";
import {UserIdWithToken} from "../../interfaces/User";

export default {
  Query: {
    loans: async () => {
      return loanModel.find();
    },
    loanByOwner: async (_parent: unknown, args: UserIdWithToken) => {
      return loanModel.find({user: args.id});
    }
  },
  Mutation: {
    createLoan: async (_parent: undefined, args: Loans, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      console.log(args);
      console.log(user);
      args.user = user.id as unknown as Types.ObjectId;
      const loan = new loanModel(args);
      return await loan.save();
    },
  }
}
