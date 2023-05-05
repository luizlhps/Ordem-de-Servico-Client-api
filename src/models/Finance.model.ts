import { model, Schema } from "mongoose";

export const Balance = model(
  "Balance",
  new Schema({
    amount: {
      type: Number,
      default: 0,
    },
  })
);

export const Transaction = model(
  "Transaction",
  new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      type: { type: String, enum: ["credit", "debit"], required: true },
      status: { type: String, required: true },
      order: { type: Schema.Types.ObjectId, ref: "Order" },
      entryDate: { type: Date, required: true },
      exitDate: { type: Date },
    },
    { timestamps: true, versionKey: false }
  )
);
