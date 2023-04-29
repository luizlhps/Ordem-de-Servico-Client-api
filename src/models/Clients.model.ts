import mongoose, { Schema, Document, model } from "mongoose";

export interface IClients extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  orders: Schema.Types.ObjectId[];
  createdAt: DateConstructor | undefined;
}

const ClientSchema = new Schema<IClients>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
});

export const Client = model("Cliente", ClientSchema);
