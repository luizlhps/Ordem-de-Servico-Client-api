import { Request, Response } from "express";
import { serviceCounter, serviceModel } from "../models/Service.model";
import { model, Schema } from "mongoose";
import { counterId } from "../utils/autoIncrementId";

class Service {
  async createService(req: Request, res: Response) {
    const { title, description, amount } = req.body;

    const incrementId = (await counterId(serviceCounter)).getNextId;
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
      const service = await serviceModel.findByIdAndDelete(req.params.id);
      res.status(200).send("Serviço apagado com sucesso!!");
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  async updateService(req: Request, res: Response) {
    try {
      const service = await serviceModel.findByIdAndUpdate(req.params.id);
      res.status(200).send("Serviço atualizado com sucesso!!");
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  async getSearch(req: Request, res: Response) {
    const { query } = req.query;
    const numberId = Number(query);
    try {
      const service = await serviceModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { id: numberId ? numberId : null },
        ],
      });
      if (service.length < 1) return res.status(404).json("nada encontrado");
      res.status(200).json(service);
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const service = await serviceModel.find();

      res.status(200).json(service);
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
}

export const service = new Service();
