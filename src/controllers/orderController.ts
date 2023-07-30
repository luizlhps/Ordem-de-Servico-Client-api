import { Request, Response } from "express";
import mongoose, { Types, Schema, Document, Error } from "mongoose";
import { custom } from "joi";
import { orderModel, ordersCounter } from "../models/Ordermodel";
import { serviceModel, servicePrice } from "../models/Service.model";
import { StatusModel } from "../models/Status.model";
import { ObjectId } from "bson";
import { counterId } from "../utils/autoIncrementId";
import { CostumerModel } from "../models/Costomer.model";
import { orderServicePrice } from "./orderController/orderAmount";

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
          .sort({ id: -1 })
          .skip(Number(page) === 0 ? 1 : (Number(page) - 1) * Number(limit))
          .limit(Number(limit) === 0 ? count : Number(limit));
        /*  .populate(["status", "services", "orders", "customer"]); */

        res.status(200).json({
          total: count,
          page: Number(page),
          limit: Number(limit),
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
        $and: [
          {
            $or: [
              { equipment: { $regex: filter, $options: "i" } },
              { brand: { $regex: filter, $options: "i" } },
              { model: { $regex: filter, $options: "i" } },
              { defect: { $regex: filter, $options: "i" } },
              { observation: { $regex: filter, $options: "i" } },
            ],
          },
          { deleted: true },
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
        .populate("customer");

      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), orders });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter os pedidos do cliente" });
    }
  }

  async getOrderPending(req: Request, res: Response) {
    try {
      const { filter, page = 1, limit = 10 } = req.query;

      const numberId = Number(filter);
      //orders
      const statusPending = await StatusModel.findOne({ name: "Aberto" });
      if (!statusPending) await StatusModel.create({ name: "Aberto" });

      const count = await orderModel.countDocuments({
        $and: [
          {
            $and: [{ status: statusPending?._id }, { deleted: false }],
          },
          { deleted: false },
        ],
      });

      const orders = await orderModel
        .aggregate([
          { $match: { $and: [{ status: statusPending?._id }, { deleted: false }] } },
          { $sort: { total: -1 } },

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

      if (!orders) {
        throw res.status(404).send("Houve um erro ao buscar as O.S fechadas");
      }
      res.status(200).json({
        total: count,
        page: Number(page),
        limit: Number(limit),
        orders,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Ocorreu um erro ao procurar a O.S" });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const {
        equipment,
        brand,
        model,
        defect,
        exitDate,
        observation,
        dateEntry,
        services,
        status,
        customer,
        discount,
        technicalOpinion,
      } = req.body;

      const treatedServices = services.filter((falseValues: string) => {
        return falseValues;
      });

      const incrementId = (await counterId(ordersCounter)).getNextId;
      const amount = await orderServicePrice.calculate(req.params.id, treatedServices);

      const orderAlreadyExists = await orderModel.findById(req.params.id);
      if (!orderAlreadyExists) return res.status(404).json({ message: "não foi possivel encontrar a O.S" });
      const newCostumer = await CostumerModel.findById(customer);
      if (!newCostumer) return res.status(404).json({ message: "não foi possivel encontrar o cliente" });

      const totalAmount = () => {
        if (discount) {
          return Number(discount);
        }
        return 0;
      };
      console.log("existo");

      //retira a ordem de dentro do costumer
      const orderObjectId = new mongoose.Types.ObjectId(orderAlreadyExists?._id);
      const costumerOldObject = orderAlreadyExists.customer;

      console.log(orderObjectId);
      console.log(costumerOldObject);
      console.log(customer);
      console.log(newCostumer?._id);

      if (customer !== orderAlreadyExists.customer.toString()) {
        console.log(customer, orderAlreadyExists.customer);
        const costumerOldUpdate = await CostumerModel?.updateOne(
          { _id: costumerOldObject },
          { $pull: { orders: orderObjectId } }
        );

        const costumerIdObject = new mongoose.Types.ObjectId(newCostumer?._id);

        const costumerUpdate = await CostumerModel?.updateOne(
          { _id: costumerIdObject },
          { $push: { orders: orderObjectId } }
        );
      }

      const order = await orderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            equipment: equipment,
            brand: brand,
            model: model,
            defect: defect,
            discount: discount,
            technicalOpinion: technicalOpinion,
            observation: observation,
            dateEntry: dateEntry,
            services: treatedServices,
            status: status,
            exitDate: exitDate,
            customer: customer,
            totalAmount: services ? amount - totalAmount() : 0,
            amount: services ? amount : 0,
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
    console.log("opaaaaaa");
    try {
      const orderAlreadyExists = await orderModel.findById(req.params.id);
      if (!orderAlreadyExists) return res.status(404).json({ message: "não foi possivel encontrar a O.S" });

      const order = await orderModel.findByIdAndUpdate(id, { deleted: true });
      if (!order) return res.status(404).json({ message: "ordem de serviço não encontrada" });

      res.status(200).send({ message: "Ordem de serviço apagado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Houve um erro ao apagar a ordem de serviço!" });
    }
  }
}

export const orderController = new OrderController();
