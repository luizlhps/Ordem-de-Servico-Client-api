import { model, Schema } from "mongoose";

export const Balance = model(
  "Balance",
  new Schema({
    balance: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
      type: { type: String, required: true },
      status: { type: String, required: true },
      entryDate: { type: Date, required: true },
      exitDate: { type: Date },
    },
    { timestamps: true, versionKey: false }
  )
);
