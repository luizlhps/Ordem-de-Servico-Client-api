import { any } from "joi";
import mongoose, { Schema, Document, model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordRecovery: string;
  passwordExpire: Date;
}

export const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    passwordRecovery: String,
    passwordExpire: Date,
  },
  { versionKey: false, timestamps: true }
);

export const User = model("User", userSchema);
