import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

class GenerateTokenProvider {
  async exec(userId: string) {
    const access_token = jwt.sign({ _id: userId, token_id: uuidv4() }, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    return access_token;
  }
}

export const generateTokenProvider = new GenerateTokenProvider();
