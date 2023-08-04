import Express, { Request, Response } from "express";
import { User } from "../models/User.model";
import bcript from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginValidate, registerValidate } from "./validate";
import { generateTokenProvider } from "../providers/GenerateTokenProvider";
import { generateRefreshTokenProvider } from "../providers/GenerateRefreshTokenProvider";

interface IExpress {
  req?: Express.Request;
  res?: Express.Response;
}

const secret = process.env.TOKEN_SECRET;

class UserController {
  async register(req: Express.Request, res: Express.Response) {
    const { error } = registerValidate(req.body);
    try {
      if (error) return res.status(400).send(error.message);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        group: req.body.group,
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
    try {
      const { error } = loginValidate(req.body);
      if (error) return res.status(400).send(error.message);

      const user = await User.findOne({ email: req.body.email }).populate("group");

      if (!user) {
        return res.status(400).send("email ou senha incorretos");
      }
      const passwordMatch = bcript.compareSync(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(400).send("email ou senha incorretos");
      }
      const access_token = await generateTokenProvider.exec(user._id);
      const refresh_token = await generateRefreshTokenProvider.exec(user._id);

      console.log(user);

      res.header("Authorization", access_token);
      res.status(200).json({ accessToken: access_token, refreshToken: refresh_token });
    } catch (error) {}
  }

  async getAll(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;

    const numberId = Number(filter);

    try {
      const totalCount = await User.countDocuments({
        $and: [
          {
            $or: [{ name: { $regex: filter, $options: "i" } }, { id: numberId ? numberId : null }],
          },
        ],
      });

      const user = await User.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: filter, $options: "i" } }, { id: numberId ? numberId : null }],
          },
        },
        {
          $lookup: {
            from: "authgroups",
            localField: "group",
            foreignField: "_id",
            as: "group",
          },
        },
      ])
        .skip(Number(page) === 0 ? 1 : (Number(page) - 1) * Number(limit))
        .limit(Number(limit) === 0 ? totalCount : Number(limit));

      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), user });
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Erro ao achar a nota" });
    }
  }
}

export const userControler = new UserController();
