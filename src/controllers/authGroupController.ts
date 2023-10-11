import Express, { Request, Response } from "express";
import { AuthGroupModel, authGroupCounter } from "../models/AuthGroup.model";
import { counterId } from "../utils/autoIncrementId";

class AuthGroupController {
  async create(req: Request, res: Response) {
    try {
      const { name, create, deleted, view, update } = req.body;
      if (!name) return res.status(500).send("Nome é um campo necessário");
      const incrementId = (await counterId(authGroupCounter)).getNextId;
      const authGroup = await AuthGroupModel.create({
        id: await incrementId(),
        name,
        permissions: {
          create,
          deleted,
          update,
          view,
        },
      });

      if (!authGroup) return res.status(500).send("Ocorreu um erro ao criar um cargo");
      res.status(200).send(authGroup);
    } catch (error) {
      res.status(400).send("Ocorreu um Erro no authGroup");
    }
  }

  async delete(req: Express.Request, res: Express.Response) {
    try {
      const { id } = req.params;
      const AuthGroup = await AuthGroupModel.findById(id);

      if (!AuthGroup) return res.status(404).json({ error: true, code: "user.error", message: "Usuário não existe" });

      if (AuthGroup.deleted === true)
        return res.status(404).json({ error: true, code: "user.error", message: "O Usuário já esta deletado" });

      const group = await AuthGroupModel.findByIdAndUpdate(
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, create, deleted, view, update } = req.body;
      if (!name) return res.status(500).send("Nome é um campo necessário");
      const authGroup = await AuthGroupModel.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            permissions: {
              create,
              deleted,
              update,
              view,
            },
          },
        },
        { new: true }
      );

      if (!authGroup) return res.status(500).send("Ocorreu um erro ao criar um cargo");
      res.status(200).send(authGroup);
    } catch (error) {
      console.log(error);
      res.status(400).send("Ocorreu um Erro no authGroup");
    }
  }

  async getAll(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;

    const transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
    const searchFilter = transformFilterInObject?.search ? transformFilterInObject?.search : "";

    const numberId = Number(transformFilterInObject?.search);

    try {
      const totalCount = await AuthGroupModel.countDocuments({
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

      const authGroup = await AuthGroupModel.aggregate([
        {
          $match: {
            $and: [
              { deleted: false },

              {
                $or: [
                  { name: { $ne: "adminMaster", $regex: searchFilter, $options: "i" } },
                  { id: numberId ? numberId : null },
                ],
              },

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
          $group: {
            _id: "$_id",
            id: { $first: "$id" },
            name: { $first: "$name" },
            permissions: { $first: "$permissions" },
          },
        },
      ])
        .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
        .limit(Number(limit) === 0 ? totalCount : Number(limit))
        .sort({ _id: -1 });

      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), authGroup });
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Erro ao achar a nota" });
    }
  }
}

export const authGroupController = new AuthGroupController();
