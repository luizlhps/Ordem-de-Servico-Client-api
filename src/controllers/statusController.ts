import mongoose, { Request, Response } from "express";
import { StatusModel } from "../models/Status.model";
import { User } from "../models/User.model";
class StatusControler {
  async create(req: Request, res: Response) {
    try {
      const user = await User.findById(req.body.user).select("name _id").lean();

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }
      const status = new StatusModel({
        name: req.body.name,
        user: user,
      });
      await status.save();
      res.send(status);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Erro ao criar status." });
    }
  }

  async getAll(req: Request, res: Response) {
    const { query } = req.query;
    try {
      const status = await StatusModel.find();
      res.status(200).json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao achar a nota" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const status = await StatusModel.findById(req.params.id);
      res.status(200).json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao achar a nota" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const status = await StatusModel.findByIdAndDelete(req.params.id);
      if (!status) return res.status(404).send("Usuário não encontrado.");
      return res.status(200).send("Usuário deletado com sucesso.");
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const status = await StatusModel.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name } },
        { new: true }
      );
      if (!status) return res.status(404).send("Usuário não encontrado.");

      return res.status(200).json(status);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  }
}
export const statusController = new StatusControler();
