import { Request, Response } from "express";
import { serviceCounter, serviceModel } from "../models/Service.model";
import { model, Schema } from "mongoose";
import { counterId } from "../utils/autoIncrementId";

class Service {
  async createService(req: Request, res: Response) {
    const { title, description, amount } = req.body;

    const isValid = /^\d+(\.\d{1,2})?$/.test(amount.toString());
    console.log(isValid);

    if (!isValid) return res.status(400).json({ message: "O número após o ponto deve ter no máximo 2 dígitos.." });
    if (!title) return res.status(400).send({ message: "Título é necessario" });
    if (!description) return res.status(400).send({ message: "Descrição é necessaria" });
    if (!amount) return res.status(400).send({ message: "Valor é necessario" });

    const incrementId = (await counterId(serviceCounter)).getNextId;
    console.log(amount);
    try {
      const service = await serviceModel.create({
        id: await incrementId(),
        title,
        description,
        amount,
      });

      res.status(201).json(service);
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  async deleteService(req: Request, res: Response) {
    try {
      const service = await serviceModel.findByIdAndUpdate(req.params.id, { deleted: true });
      res.status(200).json({ message: "Serviço apagado com sucesso!!" });
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  async updateService(req: Request, res: Response) {
    try {
      const { title, description, amount } = req.body;

      const service = await serviceModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { title: title, description: description, amount: amount },
        },
        { new: true }
      );
      res.status(200).json(service);
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  async getSearch(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;
    if (typeof filter !== "string") {
      return res.status(400).json({ message: "O parâmetro 'filter' deve ser uma string" });
    }

    const numberId = parseInt(filter);

    try {
      const service = await serviceModel
        .find({
          $and: [
            {
              $or: [
                { title: { $regex: filter, $options: "i" } },
                { description: { $regex: filter, $options: "i" } },
                { id: numberId ? numberId : null },
              ],
            },
            { deleted: false },
          ],
        })
        .sort({ updatedAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const totalCount = await serviceModel.countDocuments({
        $and: [
          {
            $or: [
              { title: { $regex: filter, $options: "i" } },
              { description: { $regex: filter, $options: "i" } },
              { id: numberId ? numberId : null },
            ],
          },
          { deleted: false },
        ],
      });

      if (service.length < 1) return res.status(404).json("nada encontrado");
      res.status(200).json({ Total: totalCount, Page: Number(page), limit: Number(limit), service });
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
}

export const service = new Service();
