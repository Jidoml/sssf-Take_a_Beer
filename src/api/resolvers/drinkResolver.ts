import drinkModel from "../model/drinkModel";
import {Drinks} from "../../interfaces/Drinks";
import {Barrels} from "../../interfaces/Barrels";
import {UserIdWithToken} from "../../interfaces/User";
import {GraphQLError} from "graphql";

export default {
  Barrel: {
    drink: async (parent: Barrels) => {
      return (await drinkModel.findById(parent.drink)) as Drinks;
    },
  },
  Query: {
    drinks: async () => {
      return drinkModel.find();
    },
    drinkById: async (_parent: unknown, args: {id: number}) => {
      return drinkModel.findById(args.id);
    },
  },
  Mutation: {
    createDrink: async (_parent: unknown, args: {id: number}, user: UserIdWithToken) => {
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
      const drink = new drinkModel(args);
      return drink.save();
    },
    updateDrink: async (_parent: unknown, args: {id: number}, user: UserIdWithToken) => {
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
      return drinkModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteDrink: async (_parent: unknown, args: {id: number}, user: UserIdWithToken) => {
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
      return drinkModel.findByIdAndDelete(args.id);
    },
  },
};
