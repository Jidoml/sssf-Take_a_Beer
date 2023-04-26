import barrelModel from "../model/barrelModel";


export default {
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
