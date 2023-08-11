import mongoose, { Schema, model } from "mongoose";
import { version } from "os";

interface IPermissions {
  create: [string];
  deleted: [string];
  view: [string];
}

export interface IGroup {
  name: string;
  permissions: IPermissions;
}

const authGroupModel = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    permissions: {
      create: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin"],
        required: false,
      },
      update: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin"],
        required: false,
      },
      deleted: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin"],
        required: false,
      },
      view: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin", "visitor"],
        required: false,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const AuthGroupModel = model("AuthGroup", authGroupModel);
