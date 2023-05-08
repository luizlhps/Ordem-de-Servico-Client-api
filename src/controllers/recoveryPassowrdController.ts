import { Request, Response } from "express";
import { User } from "../models/User.model";
import crypto from "crypto";

class PasswordRecovery {
  async ForgetPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const oneHour = 3600000;
    user.passwordRecovery = crypto.randomBytes(20).toString("hex");
    user.passwordExpire = new Date(Date.now() + oneHour);
    user.save();
    res.send(user);
  }
}

export const passowordRecoveryController = new PasswordRecovery();
