import mongoose, { Request, Response } from "express";
import { StatusModel, statusCounter } from "../models/Status.model";
import { counterId } from "../utils/autoIncrementId";

class StatusControler {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: "É necessário o nome do status" });
    try {
      const incrementId = (await counterId(statusCounter)).getNextId();

      const status = await StatusModel.create({
        id: await incrementId,
        name,
      });

      res.send(status);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Erro ao criar status." });
    }
  }

  async getAll(req: Request, res: Response) {
    const { filter, page = 1, limit = 5 } = req.query;
    const filterId = Number(filter);
    try {
      const status = await StatusModel.find({
        $or: [{ name: { $regex: filter, $options: "i" } }, { id: filterId ? filterId : null }],
      })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const totalCount = await StatusModel.countDocuments({
        $or: [{ name: { $regex: filter, $options: "i" } }, { id: filterId ? filterId : null }],
      });

      res.status(200).json({ Page: Number(page), Limit: Number(limit), Total: Number(totalCount), status });
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
    const { id } = req.params;
    try {
      const closeNotPossiblyDelete = await StatusModel.findOne({ name: "Fechado" });
      const OpennotPossiblyDelete = await StatusModel.findOne({ name: "Aberto" });

      if (closeNotPossiblyDelete) {
        if (closeNotPossiblyDelete?._id.toString().toLowerCase() === id.toLowerCase()) {
          return res.status(401).json({ message: "Não é possivel apagar o status Fechado" });
        }
      }
      if (OpennotPossiblyDelete) {
        if (OpennotPossiblyDelete?._id.toString().toLowerCase() === id.toLowerCase()) {
          return res.status(401).json({ message: "Não é possivel apagar o status Aberto" });
        }
      }

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
