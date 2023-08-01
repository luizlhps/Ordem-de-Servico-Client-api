import mongoose, { Schema, model } from "mongoose";

export interface Group {
  name: string;
  create: Schema.Types.ObjectId;
  deleted: Schema.Types.ObjectId;
  view: Schema.Types.ObjectId;
}

const authGroupModel = new Schema<Group>({
  name: { type: String, required: true },
  create: { type: Schema.Types.ObjectId, ref: "AuthPermission", required: false },
  deleted: { type: Schema.Types.ObjectId, ref: "AuthPermission", required: false },
  view: { type: Schema.Types.ObjectId, ref: "AuthPermission", required: false },
});

export const AuthGroupModel = model("AuthGroupModel", authGroupModel);
