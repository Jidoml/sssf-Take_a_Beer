import barrelModel from "../model/barrelModel";
import {Loans} from "../../interfaces/Loans";
import {Barrels} from "../../interfaces/Barrels";
import {UserIdWithToken} from "../../interfaces/User";
import {GraphQLError} from "graphql/index";
import loanModel from "../model/loanModel";

export default {
  Loan: {
    barrel: async (parent: Loans) => {
      return (await barrelModel.findById(parent.barrel)) as Barrels;
    }
  },
  Query: {
    barrels: async () => {
      return barrelModel.find();
    },
    barrelById: async (_parent: unknown, args: {id: number}) => {
      return barrelModel.findById(args.id);
    },
  },
  Mutation: {
    createBarrel: async (_parent: unknown, args: {id: number}, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      if(user.role !== 'admin') {
        throw new GraphQLError('Not ADMIN', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      const barrel = new barrelModel(args);
      return barrel.save();
    },
    updateBarrel: async (_parent: unknown, args: {id: number}, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      if(user.role !== 'admin') {
        throw new GraphQLError('Not ADMIN', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      return barrelModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteBarrel: async (_parent: unknown, args: {id: number}, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      if(user.role !== 'admin') {
        throw new GraphQLError('Not ADMIN', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      return barrelModel.findByIdAndDelete(args.id);
    }
  }
}
