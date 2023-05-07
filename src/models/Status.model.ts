import mongoose, { Schema, Document, model } from "mongoose";
import { string } from "joi";
import { userSchema } from "./User.model";

export interface IStatus extends Document {
  name: string;
}

const statusSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },

  { versionKey: false, timestamps: true }
);

export const StatusModel = model<IStatus>("Status", statusSchema);
