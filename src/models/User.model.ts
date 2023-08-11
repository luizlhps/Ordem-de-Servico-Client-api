import { Schema, Document, model, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordRecovery: string | null;
  passwordExpire: Date | null;
  avatar: string | null;
  group: ObjectId;
  deleted: boolean;
  expiresDate: Date | null;
}

export const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    group: { type: Schema.Types.ObjectId, ref: "AuthGroup", required: true },
    avatar: { type: String, default: null },

    passwordRecovery: String,
    passwordExpire: Date,
  },
  { versionKey: false, timestamps: true }
);

export const User = model("User", userSchema);
