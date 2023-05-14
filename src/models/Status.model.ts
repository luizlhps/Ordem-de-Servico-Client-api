import mongoose, { Schema, Document, model } from "mongoose";
import { number, string } from "joi";
import { userSchema } from "./User.model";

export interface IStatus extends Document {
  name: string;
}

export const statusCounter = model(
  "counterStatus",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

const statusSchema: Schema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true },
  },

  { versionKey: false, timestamps: true }
);

export const StatusModel = model<IStatus>("Status", statusSchema);
