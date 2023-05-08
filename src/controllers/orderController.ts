import { Request, Response } from "express";
import mongoose, { Types, Schema } from "mongoose";
import { CustomerSchema } from "../models/Customer.model";
import { custom } from "joi";
import { orderModel } from "../models/Ordermodel";
import { serviceModel } from "../models/Service.model";
import { StatusModel } from "../models/Status.model";
import { ObjectId } from "bson";

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

      const order = await orderModel.create({
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
      const order = await orderModel
        .findById(id)
        .populate(["status", "services", "customer", "orders"])
        .populate({ path: "customer", populate: { path: "orders" } });

      res.status(200).json(order);
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
}

export const orderController = new OrderController();
