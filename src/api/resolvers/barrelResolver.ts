import barrelModel from "../model/barrelModel";
import {Loans} from "../../interfaces/Loans";
import {Barrels} from "../../interfaces/Barrels";

export default {
  Loans: {
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
    createBarrel: async (_parent: unknown, args: {id: number}) => {
      const barrel = new barrelModel(args);
      return barrel.save();
    },
    updateBarrel: async (_parent: unknown, args: {id: number}) => {
      //TODO: check token and if user can update barrel

      return barrelModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteBarrel: async (_parent: unknown, args: {id: number}) => {
      //TODO: check token and if user can delete barrel

      return barrelModel.findByIdAndDelete(args.id);
    }
  }
}
