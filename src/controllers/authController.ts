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

    if (!token) return res.status(403).send("Acesso Negado");

    try {
      const Verified = jwt.verify(token, secret!);
      req.user = Verified;

      const user = await User.findOne({ _id: req.user._id }).populate("group");
      const permissions = user?.group as any;
      req.user.group = permissions?.permissions;
      next();
    } catch (error) {
      res.status(403).send("acesso negado");
    }
  }
}

export const auth = new Auth();
