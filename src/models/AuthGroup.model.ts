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

export const authGroupCounter = model(
  "authGroupCounter",
  new Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
  })
);

const authGroupModel = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    permissions: {
      create: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin", "adminMaster"],
        required: false,
      },
      update: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin", "adminMaster"],
        required: false,
      },
      deleted: {
        type: [String],
        enum: ["dashboard", "customer", "finance", "order", "status", "services", "user", "admin", "adminMaster"],
        required: false,
      },
      view: {
        type: [String],
        enum: [
          "dashboard",
          "customer",
          "finance",
          "order",
          "status",
          "services",
          "user",
          "admin",
          "adminMaster",
          "visitor",
        ],
        required: false,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const AuthGroupModel = model("AuthGroup", authGroupModel);
