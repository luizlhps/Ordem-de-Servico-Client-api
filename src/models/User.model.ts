import mongoose, { Schema, Document, model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: DateConstructor | undefined;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = model("User", userSchema);
