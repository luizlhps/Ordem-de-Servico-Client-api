import { Request, Response } from "express";
import mongoose, { Types, Schema, Document, Error } from "mongoose";
import { custom } from "joi";
import { orderModel, ordersCounter } from "../models/Ordermodel";
import { serviceModel, servicePrice } from "../models/Service.model";
import { StatusModel } from "../models/Status.model";
import { ObjectId } from "bson";
import { counterId } from "../utils/autoIncrementId";
import { CostumerModel } from "../models/Costomer.model";

class OrderController {
  async createOrder(req: Request, res: Response) {
    const { equipment, brand, model, defect, services, status, customer, observation, dateEntry } = req.body;
    try {
      const costumerId = await CostumerModel.findById(customer);
      const statusId = await StatusModel.findById(status);
      const incrementId = (await counterId(ordersCounter)).getNextId;

      if (!costumerId) {
        res.status(400).json({ message: "Cliente não encontrado" });
        return;
      }

      if (!statusId) {
        res.status(400).json({ message: "Status não encontrado" });
        return;
      }

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
        customer: costumerId?._id,
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

  async getAllOrders(req: Request, res: Response) {
    try {
      const { filter, page = 1, limit = 10 } = req.query;

      const numberId = Number(filter);
      try {
        const count = await orderModel.countDocuments({
          $and: [
            {
              $or: [
                { equipment: { $regex: filter, $options: "i" } },
                { brand: { $regex: filter, $options: "i" } },
                { model: { $regex: filter, $options: "i" } },
                { defect: { $regex: filter, $options: "i" } },
                { observation: { $regex: filter, $options: "i" } },
                { id: numberId ? numberId : null },
              ],
            },
            { deleted: false },
          ],
        });

        const orders = await orderModel
          .aggregate([
            {
              $match: {
                $and: [
                  {
                    $or: [
                      { equipment: { $regex: filter, $options: "i" } },
                      { brand: { $regex: filter, $options: "i" } },
                      { model: { $regex: filter, $options: "i" } },
                      { defect: { $regex: filter, $options: "i" } },
                      { observation: { $regex: filter, $options: "i" } },
                      { id: numberId ? numberId : null },
                    ],
                  },
                  { deleted: false },
                ],
              },
            },
            /*from: <nome da Coleção onde vamos buscar os dados>,
              localField: <nome do atributo usado na condição de igualdade, na coleção origem, aqui chamada de Coleção>,
              foreignField: <nome do atributo usado na condição de igualdade na tabela destino, onde buscaremos os dados>,
              as: <atributo que receberá os novos dados > */
            {
              $lookup: {
                from: "serviceprices", // collection selecionada
                localField: "_id", // o campo que compara com a coletion serviceprices
                foreignField: "order", // campo que vai comparar com o id de cima localfield
                as: "servicesPrices", // nome
              },
            },
            {
              $lookup: {
                from: "status",
                localField: "status",
                foreignField: "_id",
                as: "status",
              },
            },
            {
              $lookup: {
                from: "services",
                localField: "services",
                foreignField: "_id",
                as: "services",
              },
            },
            {
              $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
              },
            },
            { $unwind: "$customer" },
            { $unwind: "$status" },
          ])
          .skip(Number(page) === 0 ? 1 : (Number(page) - 1) * Number(limit))
          .limit(Number(limit) === 0 ? count : Number(limit))
          .sort({ id: -1 });
        /*  .populate(["status", "services", "orders", "customer"]); */

        res.status(200).json({
          Total: count,
          Page: Number(page) === 0 ? 1 : Number(page),
          limit: Number(limit) === 0 ? count : Number(limit),
          orders,
        });
      } catch (err: any) {
        throw new Error(err);
      }
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
        customer: costumerId,
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

  async updateOrder(req: Request, res: Response) {
    const { equipment, brand, model, defect, observation, dateEntry, services, status, customer } = req.body;
    const incrementId = (await counterId(ordersCounter)).getNextId;

    try {
      const orderAlreadyExists = await orderModel.findById(req.params.id);
      if (!orderAlreadyExists) return res.status(404).json({ message: "não foi possivel encontrar a O.S" });

      /////
      if (services) {
        services.forEach(async (serviceId: string) => {
          const currentService = await serviceModel.findById(serviceId);

          if (!currentService) return res.status(404).json({ messaga: "Status não encontrado" });

          const ServicePrice = await servicePrice.find({ order: new ObjectId(req.params.id) });

          let flag = false; //indica se o preço foi incluido ou não

          ServicePrice.forEach((object) => {
            if (object.service.toString() === currentService?._id.toString()) {
              object.price = currentService.amount;

              flag = true;
              object.save();
            }
          });

          if (flag) {
            if (ServicePrice.length > services.length) {
              ServicePrice.forEach(async (object) => {
                if (!serviceId.toString().includes(object.service.toString())) {
                  await object.deleteOne({ _id: object._id });
                }
              });
            }

            return;
          } else {
            const serviceOrder = await servicePrice.create({
              id: await incrementId(),
              service: serviceId,
              price: currentService?.amount,
              order: req.params.id,
            });
          }
        });
      }

      ///////

      const order = await orderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            equipment: equipment,
            brand: brand,
            model: model,
            defect: defect,
            observation: observation,
            dateEntry: dateEntry,
            services: services,
            status: status,
            customer: customer,
          },
        },
        { new: true }
      );

      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Ocorreu um Erro ao Atualizar o Registro" });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Id para a exclusão é obrigátorio" });

    try {
      const order = await orderModel.findByIdAndUpdate(id, { deleted: true });

      if (!order) return res.status(404).json({ message: "ordem de serviço não encontrada" });

      res.status(200).json({ message: "ordem de serviço apagado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "houve um erro ao apagar a ordem de serviço!" });
    }
  }
}

export const orderController = new OrderController();
