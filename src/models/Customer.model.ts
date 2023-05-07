import mongoose, { Schema, Document, model } from "mongoose";

export interface IAddress extends Document {
  cep: string;
  state: string;
  neighborhood: string;
  complement?: string;
  street: string;
  city: string;
  number: string;
}

const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    phone: String,
    cpfOrCnpj: String,
    telephone: String,
    address: [
      {
        cep: { type: String, required: true },
        state: { type: String, required: true },
        neighborhood: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        number: { type: String, required: true },
        complement: String,
      },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { versionKey: false, timestamps: true }
);
export const CustomerSchema = model("Cliente", customerSchema);
