import { Numbers } from "@mui/icons-material";
import { Schema, Document, model, ObjectId } from "mongoose";

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  passwordRecovery: string | null;
  passwordExpire: Date | null;
  avatar: string | null;
  group: ObjectId;
  deleted: boolean;
  expiresDate: Date | null;
}

export const userCounterSchema = new Schema({
  _id: { type: String, required: true },
  seq_value: { type: Number, default: 0 },
});

export const UserCounter = model("UserCounter", userCounterSchema);

export const userSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    group: { type: Schema.Types.ObjectId, ref: "AuthGroup", required: true },
    avatar: { type: String, default: null },
    phone: { type: String, required: true },

    passwordRecovery: String,
    passwordExpire: Date,
  },
  { versionKey: false, timestamps: true }
);

export const User = model("User", userSchema);
