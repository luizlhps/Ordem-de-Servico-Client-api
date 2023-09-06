import { Request, Response } from "express";
import { User } from "../models/User.model";
import bcript from "bcryptjs";
import crypto from "crypto";
import { recoveryPasswordValidate } from "./validate";

class PasswordRecovery {
  async ForgetPassword(req: Request, res: Response) {
    try {
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
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { password, token } = req.body;

    try {
      const { error } = recoveryPasswordValidate(req.body);
      if (error) return res.status(400).send({ message: "senha inválida" });

      const user = await User.findOne({ passwordRecovery: token });
      if (!user) return res.status(400).send({ message: "Usuário não encontrado" });

      if (user.passwordExpire !== null) {
        if (user.passwordExpire < new Date(Date.now())) return res.status(400).send({ message: "Tempo Expirado" });
      }

      user.password = bcript.hashSync(password);
      user.passwordExpire = null;
      user.passwordRecovery = null;
      user.save();
      res.send(user);
    } catch (error) {}
  }
}

export const passowordRecoveryController = new PasswordRecovery();
