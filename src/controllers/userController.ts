import Express, { Request, Response } from "express";
import { User, UserCounter } from "../models/User.model";
import bcript from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginValidate, registerValidate } from "./validate";
import { generateTokenProvider } from "../providers/GenerateTokenProvider";
import { generateRefreshTokenProvider } from "../providers/GenerateRefreshTokenProvider";
import { counterId } from "../utils/autoIncrementId";
import { AuthGroupModel, authGroupCounter } from "../models/AuthGroup.model";

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

export interface IUserInputs {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  deleted: boolean;
  group: IGroup;
  createdAt: string;
  updatedAt: string;
}

class UserController {
  async register(req: Express.Request, res: Express.Response) {
    const { error } = registerValidate(req.body);
    try {
      if (error) return res.status(400).send(error.message);
      const incrementId = (await counterId(UserCounter)).getNextId();
      const user = new User({
        id: await incrementId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
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

  async updateProfileUser(req: Express.Request, res: Express.Response) {
    try {
      const userID = req.userObj?._id;
      const updateFields: any = {
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
      res.status(500).json({ error: true, code: "user.error", message: "Erro ao atualizar" });
    }
  }
  async updateOfficials(req: Express.Request, res: Express.Response) {
    try {
      const userID = req.params.id;

      const userAlreadyExist = await User.findById({ _id: userID });
      const userGroup = await AuthGroupModel.findOne({ name: "adminMaster" });

      if (!userAlreadyExist)
        return res.status(404).json({ error: true, code: "user.notFound", message: "Usuário não encontrado" });
      if (!userGroup)
        return res.status(404).json({ error: true, code: "group.notFound", message: "Cargo não encontrado" });

      if (userAlreadyExist.group.toString() === userGroup._id.toString())
        return res
          .status(404)
          .json({ error: true, code: "user.unauthorized", message: "Não é permitido editar o adminMaster" });

      const updateFields: any = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        group: req.body.group,
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

      res.status(201).send("user");
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: true, code: "user.error", message: "Erro ao atualizar" });
    }
  }

  async login(req: Express.Request, res: Express.Response) {
    try {
      const { error } = loginValidate(req.body);
      if (error) return res.status(400).send({ message: error.message });

      const user = (await User.findOne({ email: req.body.email }).populate("group")) as IUserInputs;

      if (!user) {
        return res.status(400).send("email ou senha incorretos");
      }
      const passwordMatch = bcript.compareSync(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(400).send("email ou senha incorretos");
      }
      const access_token = await generateTokenProvider.exec(user._id);
      const refresh_token = await generateRefreshTokenProvider.exec(user._id);

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
  async delete(req: Express.Request, res: Express.Response) {
    try {
      const { id } = req.params;
      const userAlredyExist = await User.findById(id);

      if (!userAlredyExist)
        return res.status(404).json({ error: true, code: "user.error", message: "Usuário não existe" });

      if (userAlredyExist.deleted === true)
        return res.status(404).json({ error: true, code: "user.error", message: "O Usuário já esta deletado" });

      const isAdmin = await AuthGroupModel.findById(userAlredyExist?.group);
      if (!isAdmin)
        return res.status(404).send({ error: true, code: "user.error", message: "houve um erro ao encontrar o cargo" });

      if (isAdmin.name === "adminMaster")
        return res
          .status(403)
          .send({ error: true, code: "user.error", message: "Não é possivel apagar o adminMaster" });

      const user = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            deleted: true,
          },
        },
        { new: true }
      );

      res.status(200).json({ message: "Usuário deletado com sucesso!!" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;

    const transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
    const searchFilter = transformFilterInObject?.search ? transformFilterInObject?.search : "";

    const numberId = Number(transformFilterInObject?.search);

    try {
      const totalCount = await User.countDocuments({
        $and: [
          {
            $or: [{ name: { $regex: searchFilter, $options: "i" } }, { id: numberId ? numberId : null }],
          },
          { deleted: false },

          //Filter of date
          transformFilterInObject?.dateFrom && transformFilterInObject?.dateTo
            ? {
                dateEntry: {
                  $gte: new Date(transformFilterInObject?.dateFrom),
                  $lte: new Date(transformFilterInObject?.dateTo),
                },
              }
            : {},
        ],
      });

      const totalCountWithoutAdminMaster = totalCount - 1;

      const user = await User.aggregate([
        {
          $match: {
            $and: [
              {
                $or: [{ name: { $regex: searchFilter, $options: "i" } }, { id: numberId ? numberId : null }],
              },
              { deleted: false },

              //Filter of date
              transformFilterInObject?.dateFrom && transformFilterInObject?.dateTo
                ? {
                    dateEntry: {
                      $gte: new Date(transformFilterInObject?.dateFrom),
                      $lte: new Date(transformFilterInObject?.dateTo),
                    },
                  }
                : {},
            ],
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
        { $unwind: "$group" },
        { $unset: "password" },
      ])
        .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
        .limit(Number(limit) === 0 ? totalCountWithoutAdminMaster : Number(limit));

      const filteredUsers = user.filter((user) => {
        return user.group.name !== "adminMaster";
      });

      res
        .status(200)
        .json({ total: totalCountWithoutAdminMaster, page: Number(page), limit: Number(limit), user: filteredUsers });
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
