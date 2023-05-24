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
export const CostumersCounter = model(
  "costumersCounter",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

const customerSchema = new mongoose.Schema(
  {
    id: Number,
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
export const CustomerModal = model("Customer", customerSchema);
