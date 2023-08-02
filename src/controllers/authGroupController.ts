import { Request, Response } from "express";
import { AuthGroupModel } from "../models/AuthGroup.model";

class AuthGroupController {
  async create(req: Request, res: Response) {
    try {
      const { name, create, deleted, view, update } = req.body;
      if (!name) return res.status(500).send("Nome é um campo necessário");

      const authGroup = await AuthGroupModel.create({
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, create, deleted, view, update } = req.body;
      if (!name) return res.status(500).send("Nome é um campo necessário");
      console.log(id);
      const authGroup = await AuthGroupModel.findByIdAndUpdate(id, {
        $set: {
          name,
          permissions: {
            create,
            deleted,
            update,
            view,
          },
        },
      });

      if (!authGroup) return res.status(500).send("Ocorreu um erro ao criar um cargo");
      res.status(200).send(authGroup);
    } catch (error) {
      console.log(error);
      res.status(400).send("Ocorreu um Erro no authGroup");
    }
  }

  async getAll(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;

    const numberId = Number(filter);

    try {
      const totalCount = await AuthGroupModel.countDocuments({
        $and: [
          {
            $or: [{ name: { $regex: filter, $options: "i" } }, { id: numberId ? numberId : null }],
          },
        ],
      });

      const authGroup = await AuthGroupModel.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: filter, $options: "i" } }, { id: numberId ? numberId : null }],
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            permissions: { $first: "$permissions" },
          },
        },
      ])
        .skip(Number(page) === 0 ? 1 : (Number(page) - 1) * Number(limit))
        .limit(Number(limit) === 0 ? totalCount : Number(limit));

      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), authGroup });
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Erro ao achar a nota" });
    }
  }
}

export const authGroupController = new AuthGroupController();
