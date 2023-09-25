import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../models/User.model";

const secret = process.env.TOKEN_SECRET;

class Auth {
  async autheticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization");

      if (!token) return res.status(401).send("Acesso Negado");
      const Verified = jwt.verify(token, secret!) as any;

      req.userObj = Verified;

      const user = await User.findOne({ _id: req.userObj?._id }).populate("group");

      if (!user) return res.status(403).send({ error: true, code: "token.user.invalid", message: "Token inválido." });
      const permissions = user?.group as any;

      if (user.deleted === true)
        return res.status(401).send({ error: true, code: "token.user.deleted", message: "Acesso negado!" });

      if (req.userObj) req.userObj.group = permissions?.permissions;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).send({ error: true, code: "token.expired", message: "Token inválido." });
      }

      console.log(error);
      res.status(401).json({ error: true, code: "token.invalido", message: "Acesso negado!" });
    }
  }
}

export const auth = new Auth();
