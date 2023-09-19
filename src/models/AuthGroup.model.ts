import mongoose, { Schema, model } from "mongoose";
import { version } from "os";

interface IPermissions {
  create: [string];
  deleted: [string];
  view: [string];
  update: [string];
}

export interface IGroup {
  name: string;
  deleted: boolean;
  id: number;
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
    id: Number,
    name: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    permissions: {
      create: {
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
          "permissionsGroup",
          "adminMaster",
        ],
        required: false,
      },
      update: {
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
          "permissionsGroup",
          "adminMaster",
        ],
        required: false,
      },
      deleted: {
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
          "permissionsGroup",
          "adminMaster",
        ],
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
          "permissionsGroup",
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
