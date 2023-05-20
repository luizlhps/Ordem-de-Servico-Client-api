import { Schema, model } from "mongoose";

//Pega um model e faz o update adicionando mais um no seq_value
export const counterId = async (name: any) => {
  const nameModel = name;

  const getNextId = async () => {
    try {
      const count = await nameModel.findOneAndUpdate(
        { _id: "autoval" },
        { $inc: { seq_value: 1 } },
        { returnNewDocument: true, upsert: true, new: true }
      );
      return count.seq_value;
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    getNextId,
  };
};
