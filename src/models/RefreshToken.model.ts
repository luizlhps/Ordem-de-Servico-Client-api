import { Schema, model, Document, ObjectId, Types } from "mongoose";

export interface IRefreshToken extends Document {
  userId: Types.ObjectId;
  token: string;
}

const refreshTokenModel: Schema<IRefreshToken> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, require: true },
});

export const RefreshTokenModel = model("refreshToken", refreshTokenModel);
