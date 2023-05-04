import barrelModel from "../model/barrelModel";
import {Loans} from "../../interfaces/Loans";
import {Barrel} from "../../interfaces/Barrel";
import {UserIdWithToken} from "../../interfaces/User";
import {GraphQLError} from "graphql/index";

export default {
  Loan: {
    barrel: async (parent: Loans) => {
      let barrels: Barrel[] = [];
      for (const barrelId of parent.barrel) {
        const barrel = (await barrelModel.findById(barrelId)) as Barrel;
        barrels.push(barrel);
      }
      return barrels;
    }
  },
  Query: {
    barrels: async () => {
      return barrelModel.find();
    },
    barrelById: async (_parent: unknown, args: {id: number}) => {
      return barrelModel.findById(args.id);
    },
    barrelByDrink: async (_parent: unknown, args: {drinkId: number}) => {
      return barrelModel.find({drink: args.drinkId});
    },
  },
  Mutation: {
    createBarrel: async (_parent: undefined, args: Barrel, user: UserIdWithToken) => {
      if(!user.token) {
        throw new GraphQLError('User not logged in', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      console.log(args);
      if(user.role !== 'admin') {
        throw new GraphQLError('Not ADMIN', {
          extensions: {code: 'UNAUTHORIZED'},
        });
      }
      const barrel = new barrelModel(args);
      console.log(barrel);
      return await barrel.save();
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
