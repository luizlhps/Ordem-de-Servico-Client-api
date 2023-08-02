import { Request, Response } from "express";
import { AuthPermissionModel } from "../models/AuthPermission.model";

class AuthPermissionController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) throw res.status(500).send("Nome é um campo necessário");

      const authPermission = await AuthPermissionModel.create({
        name,
      });

      if (!authPermission) throw res.status(500).send("Ocorreu um erro ao criar um cargo");
      res.status(200).send(authPermission);
    } catch (error) {
      res.status(400).send("Ocorreu um Erro no authPermission");
    }
  }
}

export const authPermissionController = new AuthPermissionController();
