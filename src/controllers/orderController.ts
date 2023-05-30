import { Request, Response } from "express";
import mongoose, { Types, Schema, Document, Error } from "mongoose";
import { custom } from "joi";
import { orderModel, ordersCounter } from "../models/Ordermodel";
import { serviceModel } from "../models/Service.model";
import { StatusModel } from "../models/Status.model";
import { ObjectId } from "bson";
import { counterId } from "../utils/autoIncrementId";
import { CostumerModel } from "../models/Costomer.model";

class OrderController {
  async createOrder(req: Request, res: Response) {
    const { equipment, brand, model, defect, services, status, costumer, observation, dateEntry } = req.body;
    try {
      const costumerId = await CostumerModel.findById(costumer);
      const statusId = await StatusModel.findById(status);

      const validadEerrorsService: string[] = [];

      /*       const validatedServices = await Promise.all(
        services.map(async (serviceId: string) => {
          if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            validadEerrorsService.push(`Serviço não é valido: ${serviceId}`);
            return null;
          }

          const existingService = await serviceModel.findById(serviceId);
          if (!existingService) {
            validadEerrorsService.push(`Serviço não encotrado: ${serviceId}`);
            return null;
          }

          return existingService;
        })
      )
      
      if (validadEerrorsService.length > 0) {
        res.status(400).json({ message: validadEerrorsService.join("; ") });
        return;
      } */

      if (!costumerId) {
        res.status(400).json({ message: "Cliente não encontrado" });
        return;
      }

      if (!statusId) {
        res.status(400).json({ message: "Status não encontrado" });
        return;
      }

      const incrementId = (await counterId(ordersCounter)).getNextId;

      const order = await orderModel.create({
        id: await incrementId(),
        equipment,
        brand,
        model,
        observation,
        defect,
        dateEntry,
        services: [],
        status: statusId?._id,
        costumer: costumerId?._id,
      });

      const costumerIdObject = new mongoose.Types.ObjectId(costumerId?._id);
      const orderIdObject = new mongoose.Types.ObjectId(order._id);

      const costumerUpdate = await CostumerModel?.updateOne(
        { _id: costumerIdObject },
        { $push: { orders: orderIdObject } }
      );

      console.log(new ObjectId(costumerId._id));
      res.status(200).json({ order });
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async getByIdOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { filter, page = 1, limit = 10 } = req.query;

      const getsss = async (page = 1, limit = 5) => {
        const numberId = Number(filter);
        try {
          const orders = await orderModel
            .find({
              $or: [
                { equipment: { $regex: filter, $options: "i" } },
                { brand: { $regex: filter, $options: "i" } },
                { model: { $regex: filter, $options: "i" } },
                { defect: { $regex: filter, $options: "i" } },
                { observation: { $regex: filter, $options: "i" } },
              ],
            })
            .populate(["status", "services", "orders", "costumer"])
            .skip((page - 1) * limit)
            .limit(limit)
            .find();

          const count = await orderModel.estimatedDocumentCount();

          return { total: count, pageCurrent: Number(page), limitTotal: Number(limit), orders };
        } catch (err: any) {
          throw new Error(err);
        }
      };

      const { orders, total, pageCurrent, limitTotal } = await getsss(Number(page), Number(limit));

      res.status(200).json({ Total: total, Page: pageCurrent, limit: limitTotal, orders });
    } catch (error: any) {
      console.warn(error);
      res.status(400).send({ message: error.message });
    }
  }

  async getCostumerOrders(req: Request, res: Response) {
    const { costumerId, filter = "", page = 1, limit = 10 } = req.query;
    if (!costumerId) return res.status(404).json({ message: "Id do cliente é obrigatório" });

    try {
      const costumer = await CostumerModel.findById(costumerId);

      if (!costumer) return res.status(404).json({ message: "Cliente não encontrado" });

      const queryFilter = {
        costumer: costumerId,
        $or: [
          { equipment: { $regex: filter, $options: "i" } },
          { brand: { $regex: filter, $options: "i" } },
          { model: { $regex: filter, $options: "i" } },
          { defect: { $regex: filter, $options: "i" } },
          { observation: { $regex: filter, $options: "i" } },
        ],
      };

      const totalCount = await orderModel.countDocuments({ costumer: costumerId });

      // Consulta os pedidos do cliente com a paginação
      const orders = await orderModel
        .find(queryFilter)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate("services")
        .populate("status")
        .exec();

      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), orders });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter os pedidos do cliente" });
    }
  }
}

export const orderController = new OrderController();
