import mongoose, { Schema, Document, model } from "mongoose";
import { IClients } from "./Clients.model";

export interface IOrder extends Document {
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  services: string[];
  status: Schema.Types.ObjectId[];
  client: Schema.Types.ObjectId[];
}

const orderSchema: Schema = new Schema({
  equipment: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  defect: { type: String, required: true },
  services: { type: [String], required: true },
  status: { type: Schema.Types.ObjectId, ref: "status", required: true },
  /*   client: { type: Schema.Types.ObjectId, ref: "Client", required: true }, */
});

export const Client = model("Order", orderSchema);
