import mongoose, { Schema, Document, model } from "mongoose";
import { serviceModel } from "./Service.model";

export interface IOrder extends Document {
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  services: string[];
  status: Schema.Types.ObjectId[];
  client: Schema.Types.ObjectId[];
}

const orderSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true },
    equipment: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    defect: { type: String, required: true },
    services: { type: [serviceModel], required: false },
    status: { type: Schema.Types.ObjectId, ref: "status", required: true },
    /*   client: { type: Schema.Types.ObjectId, ref: "Client", required: true }, */
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Client = model("Order", orderSchema);
