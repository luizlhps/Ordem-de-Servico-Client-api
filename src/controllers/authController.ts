import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";

export interface AuthenticatedRequest extends Request {
  user?: any;
}
const secret = process.env.TOKEN_SECRET;

class Auth {
  async autheticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("Acesso Negado");

    try {
      const Verified = jwt.verify(token, secret!);
      req.user = Verified;

      next();
    } catch (error) {
      res.status(401).send("acesso negado");
    }
  }
}

export const auth = new Auth();
