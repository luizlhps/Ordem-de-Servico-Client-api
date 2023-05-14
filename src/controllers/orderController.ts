import { Request, Response } from "express";
import mongoose, { Types, Schema, Document, Error } from "mongoose";
import { CustomerSchema } from "../models/Customer.model";
import { custom } from "joi";
import { orderModel, ordersCounter } from "../models/Ordermodel";
import { serviceModel } from "../models/Service.model";
import { StatusModel } from "../models/Status.model";
import { ObjectId } from "bson";
import { counterId } from "../utils/autoIncrementId";

class OrderController {
  async createOrder(req: Request, res: Response) {
    const { equipment, brand, model, defect, services, status, customer } = req.body;
    try {
      const customerId = await CustomerSchema.findById(customer);
      const statusId = await StatusModel.findById(status);

      const validadEerrorsService: string[] = [];
      const validatedServices = await Promise.all(
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
      );
      if (validadEerrorsService.length > 0) {
        res.status(400).json({ message: validadEerrorsService.join("; ") });
        return;
      }

      if (!customerId) {
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
        defect,
        services: validatedServices,
        status: statusId?._id,
        customer: customerId?._id,
      });

      const customerIdObject = new mongoose.Types.ObjectId(customerId?._id);
      const customerUpdate = await CustomerSchema?.updateOne(
        { _id: customerIdObject },
        { $push: { orders: new mongoose.Types.ObjectId(customerId?._id) } }
      );

      console.log(new ObjectId(customerId._id));
      res.status(200).json({ order });
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async getByIdOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { limit, page } = req.query;

      const getsss = async (page = 1, limit = 5) => {
        try {
          const orders = await orderModel
            .find<Document>()
            .populate(["status", "services", "orders"])
            .skip((page - 1) * limit)
            .limit(limit);

          const count = await orderModel.estimatedDocumentCount();
          return { orders, total: count };
        } catch (err: any) {
          throw new Error(err);
        }
      };

      const { orders, total } = await getsss(Number(page), Number(limit));

      res.status(200).json({ total, page: Number(page), orders });
    } catch (error: any) {
      console.warn(error);
      res.status(400).send({ message: error.message });
    }
  }
}

export const orderController = new OrderController();
