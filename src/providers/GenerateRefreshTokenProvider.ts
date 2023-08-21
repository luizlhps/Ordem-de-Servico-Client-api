import jwt from "jsonwebtoken";
import { RefreshTokenModel } from "../models/RefreshToken.model";

class GenerateRefreshTokenProvider {
  async exec(userId: string) {
    const accessRefreshToken = jwt.sign({ _id: userId }, process.env.TOKEN_SECRET!, {
      expiresIn: "15d",
    });

    const alreadyExistRefreshTokenInDatabase = await RefreshTokenModel.findOne({ userId: userId });
    if (alreadyExistRefreshTokenInDatabase) {
      await RefreshTokenModel.findByIdAndUpdate(
        alreadyExistRefreshTokenInDatabase._id,
        {
          $set: {
            userId: userId,
            token: accessRefreshToken,
          },
        },
        { new: true }
      );

      return accessRefreshToken;
    }

    const refreshTokenObj = new RefreshTokenModel({ userId: userId, token: accessRefreshToken });
    await refreshTokenObj.save();

    return accessRefreshToken;
  }
}

export const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
