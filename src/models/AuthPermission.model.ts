import mongoose, { Schema, model } from "mongoose";

export interface AuthPermission {
  name: string;
}

const authPermission = new Schema<AuthPermission>({
  name: { type: String, required: true },
});

export const AuthPermissionModel = model("AuthPermission", authPermission);
