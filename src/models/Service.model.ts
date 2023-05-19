import { Schema, model, Document } from "mongoose";

interface IService extends Document {
  id: number;
  title: string;
  description: string;
  amount: number;
  deleted: Boolean;
}

export const serviceCounter = model(
  "serviceStatus",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

export const serviceModel = model<IService>(
  "Service",
  new Schema(
    {
      id: { type: Number, unique: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      deleted: { type: Boolean, default: false, required: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);
