import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IRefreshToken, RefreshTokenModel } from "../models/RefreshToken.model";
import { generateTokenProvider } from "../providers/GenerateTokenProvider";
import { ConstructionOutlined } from "@mui/icons-material";

interface GroupPermissions {
  create: string[];
  deleted: string[];
  update: string[];
  view: string[];
}

interface Group {
  permissions: GroupPermissions;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface UserInterface {
  _id: string;
  group: Group;
  iat: number;
  exp: number;
}

class HandleRefreshToken {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token não fornecido" });
      }

      const refreshTokenObj = await RefreshTokenModel.findOne({ token: refreshToken });

      if (!refreshTokenObj) {
        return res.status(403).json({ error: "Refresh token inválido" });
      }

      // Verificar se o refreshToken não expirou
      const secret = process.env.TOKEN_SECRET;

      const refreshTokenPayload = jwt.verify(refreshToken, secret!) as IRefreshToken;

      const userId = refreshTokenPayload._id;
      const userIdDatabase = refreshTokenObj.userId.toString();

      if (userId !== userIdDatabase) return res.status(403).send({ message: "Refresh token inválido" });

      //gera um novo acessToken
      /*   const user = await User.findById(userId); */
      console.log(refreshTokenPayload);

      const accessToken = await generateTokenProvider.exec(refreshTokenObj.userId.toString());

      return res.json({ accessToken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao gerar novo accessToken" });
    }
  }
}

export const handleRefreshToken = new HandleRefreshToken();
