import { Schema, model, Document } from "mongoose";

interface IService extends Document {
  id: number;
  title: string;
  description: string;
  amount: number;
  deleted: boolean;
  version: number;
}

export const serviceCounter = model(
  "serviceStatus",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

export const servicePrice = model(
  "servicePrice",
  new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    price: { type: Number, required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
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
  ).index({ description: 1, title: 1 })
);
