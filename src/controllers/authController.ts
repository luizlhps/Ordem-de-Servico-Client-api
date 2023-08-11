import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../models/User.model";

const secret = process.env.TOKEN_SECRET;

class Auth {
  async autheticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("Acesso Negado");
    try {
      const Verified = jwt.verify(token, secret!) as any;

      req.userObj = Verified;

      const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
      const permissions = user?.group as any;

      if (req.userObj) req.userObj.group = permissions?.permissions;

      next();
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        return res.status(401).send({ error: true, code: "token.expired", message: "Token inválido." });
      }
      res.status(401).json({ error: true, code: "token.invalido", message: "Acesso negado!" });
    }
  }
}

export const auth = new Auth();
