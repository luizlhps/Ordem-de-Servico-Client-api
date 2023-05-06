import { Schema, model } from "mongoose";

export const serviceModel = model(
  "service",
  new Schema(
    {
      id: { type: String, unique: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);
