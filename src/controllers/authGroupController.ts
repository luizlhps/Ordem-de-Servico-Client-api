import { Request, Response } from "express";
import { AuthGroupModel } from "../models/AuthGroup.model";

class AuthGroupController {
  async create(req: Request, res: Response) {
    try {
      const { name, create, deleted, view } = req.body;
      if (!name) throw res.status(500).send("Nome é um campo necessário");

      const authGroup = AuthGroupModel.create({
        name,
        create,
        deleted,
        view,
      });

      if (!authGroup) throw res.status(500).send("Ocorreu um erro ao criar um cargo");
      res.status(200).send(authGroup);
    } catch (error) {
      res.status(400).send("Ocorreu um Erro no authGroup");
    }
  }
}

export const authGroupController = new AuthGroupController();
