import jwt from "jsonwebtoken";

class GenerateTokenProvider {
  async exec(userId: string) {
    const access_token = jwt.sign({ _id: userId }, process.env.TOKEN_SECRET!, {
      expiresIn: "15s",
    });
    return access_token;
  }
}

export const generateTokenProvider = new GenerateTokenProvider();
