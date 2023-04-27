import drinkModel from "../model/drinkModel";
import {Drinks} from "../../interfaces/Drinks";
import {Barrels} from "../../interfaces/Barrels";

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
    createDrink: async (_parent: unknown, args: {id: number}) => {
      const drink = new drinkModel(args);
      return drink.save();
    },
    updateDrink: async (_parent: unknown, args: {id: number}) => {
      //TODO: check token and if user can update drink

      return drinkModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteDrink: async (_parent: unknown, args: {id: number}) => {
      //TODO: check token and if user can delete drink

      return drinkModel.findByIdAndDelete(args.id);
    },
  },
};
