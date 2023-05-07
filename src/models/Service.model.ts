import { Schema, model, Document } from "mongoose";

interface IService extends Document {
  id: string;
  title: string;
  description: string;
  amount: number;
}

export const serviceModel = model<IService>(
  "Service",
  new Schema(
    {
      id: { type: String, unique: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);
