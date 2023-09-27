import { model, Schema } from "mongoose";

export interface IBalance extends Document {
  amount: number;
}

export interface ITransaction extends Document {
  id: number;
  title: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  status: string;
  order: Schema.Types.ObjectId;
  entryDate: Date;
  payDay: Date;
  dueDate?: Date;
  deleted: boolean;
}

export interface ITransactionProps {
  id: number;
  title: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  status: string;
  order: Schema.Types.ObjectId;
  entryDate: Date;
  payDay: Date;
  dueDate?: Date;
  deleted: boolean;
}

export const counterFinanceModel = model(
  "CounterFinance",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

export const Transaction = model<ITransaction>(
  "Transaction",
  new Schema(
    {
      id: { type: Number, unique: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      type: { type: String, enum: ["credit", "debit"], required: true },
      status: { type: String, required: true },
      order: { type: Schema.Types.ObjectId, ref: "Order" },
      entryDate: { type: Date, required: true },
      payDay: { type: Date, required: false },
      dueDate: { type: Date, required: false },
      deleted: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
  )
);
