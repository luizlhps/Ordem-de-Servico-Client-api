import Express, { Request, Response } from "express";
import { User } from "../models/User.model";
import bcript from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginValidate, registerValidate } from "./validate";
import { generateTokenProvider } from "../providers/GenerateTokenProvider";
import { generateRefreshTokenProvider } from "../providers/GenerateRefreshTokenProvider";

export interface IPermission {
  create: string[];
  deleted: string[];
  update: string[];
  view: string[];
}

interface IInputsUpdate {
  name: string;
  email: string;
  password?: string;
  phone: string;
}
export interface IGroup {
  permissions: IPermission;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  deleted: boolean;
  group: IGroup;
  createdAt: string;
  updatedAt: string;
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
        phone: req.body.phone,
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

  async update(req: Express.Request, res: Express.Response) {
    try {
      const userID = req.userObj?._id;
      const updateFields: IInputsUpdate = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      };

      if (req.body.password) {
        updateFields.password = bcript.hashSync(req.body.password);
      }

      const user = await User.findByIdAndUpdate(
        userID,
        {
          $set: updateFields,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) res.status(404).json({ error: true, code: "user.notFound", message: "Usuário não encontrado" });
      res.status(201).send(user);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: true, code: "user.error", message: "Erro ao atualizar o update" });
    }
  }

  async login(req: Express.Request, res: Express.Response) {
    try {
      const { error } = loginValidate(req.body);
      if (error) return res.status(400).send(error.message);

      const user = (await User.findOne({ email: req.body.email }).populate("group")) as IUser;

      console.log(user);
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
      const permissions = user.group.permissions;
      const roles = {
        _id: user.group._id,
        name: user.group.name,
      };

      res.header("Authorization", access_token);
      res.status(200).json({ accessToken: access_token, refreshToken: refresh_token, roles, permissions });
    } catch (error) {
      console.log(error);
    }
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

  async getMyInfo(req: Request, res: Response) {
    const data = req.headers["authorization"];
    if (!data) return res.status(404).send({ message: "Usuário não encontrado" });
    const userTokenDecode = jwt.decode(data) as any;
    if (!userTokenDecode) return res.status(404).send({ message: "Usuário não encontrado" });
    try {
      const user = await User.findById({ _id: userTokenDecode._id })
        .populate("group")
        .select("-password")
        .select("-deleted");

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao achar o usuário" });
    }
  }
}

export const userControler = new UserController();
