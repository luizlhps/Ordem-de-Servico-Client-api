import Express from "express";
import { User } from "../models/User.model";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidate, registerValidate } from "./validate";

interface IExpress {
  req?: Express.Request;
  res?: Express.Response;
}

const secret = process.env.TOKEN_SECRET;

class UserController {
  async register(req: Express.Request, res: Express.Response) {
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcript.hashSync(req.body.password),
      });

      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(400).send("Este e-mail já está sendo usado.");
      } else {
        res.status(400).send(error);
      }
    }
  }

  async login(req: Express.Request, res: Express.Response) {
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send("email ou senha incorretos");
      }
      const passwordMatch = bcript.compareSync(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(400).send("email ou senha incorretos");
      }

      const token = jwt.sign({ _id: user._id }, secret!, {
        expiresIn: "15d",
      });

      console.log(token);
      res.header("Authorization", token);
      res.status(200).json({ accessToken: token });
    } catch (error) {}
  }
}

export const userControler = new UserController();
