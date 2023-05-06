import { Request, Response } from "express";
import { serviceModel } from "../models/Service.model";
import { model, Schema } from "mongoose";

class Service {
  async createService(req: Request, res: Response) {
    const { title, description, amount } = req.body;
    ////////////
    // counter Table
    const counterSchema = model(
      "counterService",
      new Schema({
        _id: { type: String, required: true },
        seq_value: { type: Number, default: 0 },
      })
    );

    async function getNextStudentId() {
      try {
        const count = await counterSchema.findOneAndUpdate(
          { _id: "autoval" },
          { $inc: { seq_value: 1 } },
          { returnNewDocument: true, upsert: true, new: true }
        );
        return count.seq_value;
      } catch (error) {
        console.warn(error);
      }
    }
    ////////////
    try {
      const service = await serviceModel.create({
        id: await getNextStudentId(),
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
    try {
      const service = await serviceModel.find().find({
        $or: [
          { title: { $Regex: query, $Options: "i" } },
          { description: { $Regex: query, $Options: "i" } },
        ],
      });
      res.status(200).json(service);
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
}

export const service = new Service();
