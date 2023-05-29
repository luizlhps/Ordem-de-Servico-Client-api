import mongoose, { Schema, Document, model } from "mongoose";
import { serviceModel } from "./Service.model";

export interface IOrder extends Document {
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  observation: string;
  services: Schema.Types.ObjectId[];
  status: Schema.Types.ObjectId[];
  client: Schema.Types.ObjectId[];
}

export const ordersCounter = model(
  "ordersStatus",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

const orderSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true },
    equipment: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    defect: { type: String, required: true },
    observation: { type: String, required: false },
    dateEntry: { type: Date, required: true },

    services: [{ type: Schema.Types.ObjectId, ref: "Service", required: false }],
    status: { type: Schema.Types.ObjectId, ref: "Status", required: false },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    strictPopulate: false,
  }
);

export const orderModel = model("Order", orderSchema);