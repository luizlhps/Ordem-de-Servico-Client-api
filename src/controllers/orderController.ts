import { Request, Response } from "express";
import mongoose from "mongoose";
import { orderModel, ordersCounter } from "../models/Ordermodel";
import { StatusModel } from "../models/Status.model";
import { ObjectId } from "bson";
import { counterId } from "../utils/autoIncrementId";
import { customerModel } from "../models/Customer.model";
import { orderServicePrice } from "./orderController/orderAmount";
import { IRequest } from "../types/requestType";

class OrderController {
  private deletedFilter = (deleted: string | string[]): boolean | null => {
    if (deleted === "true") return true;
    if (deleted === "false") return false;
    return null;
  };

  async createOrder(req: IRequest, res: Response) {
    const { equipment, brand, model, defect, services, status, customer, observation, dateEntry } = req.body;
    try {
      const customerId = await customerModel.findById(customer);
      const statusId = await StatusModel.findById(status);
      const incrementId = (await counterId(ordersCounter)).getNextId;

      if (!customerId) {
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
        customer: customerId?._id,
      });

      const customerIdObject = new mongoose.Types.ObjectId(customerId?._id);
      const orderIdObject = new mongoose.Types.ObjectId(order._id);

      const customerUpdate = await customerModel?.updateOne(
        { _id: customerIdObject },
        { $push: { orders: orderIdObject } }
      );

      res.status(200).json({ order });
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async getAllOrders(req: IRequest, res: Response) {
    try {
      const { filter, page = 1, limit = 10, deleted } = req.query;
      const transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;

      const searchFilter = transformFilterInObject?.search ? transformFilterInObject?.search : "";
      const numberId = Number(transformFilterInObject?.search);

      const deletedIsString = typeof deleted === "string" ? deleted : "";

      const paramsOfFilter = {
        $and: [
          {
            $or: [
              {
                equipment: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                brand: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                model: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                defect: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                observation: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              { id: numberId ? numberId : null },
            ],
          },

          //filter search
          transformFilterInObject?.status ? { status: new ObjectId(transformFilterInObject?.status) } : {},
          transformFilterInObject?.customer ? { customer: new ObjectId(transformFilterInObject?.customer) } : {},

          transformFilterInObject?.dateFrom && transformFilterInObject?.dateTo
            ? {
                dateEntry: {
                  $gte: new Date(transformFilterInObject?.dateFrom),
                  $lte: new Date(transformFilterInObject?.dateTo),
                },
              }
            : {},

          deleted ? { deleted: this.deletedFilter(deletedIsString) } : {},
        ],
      };

      const totalOrdersInFetch = await orderModel.countDocuments({
        ...paramsOfFilter,
      });

      const orders = await orderModel
        .aggregate([
          {
            $match: {
              ...paramsOfFilter,
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
        .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
        .limit(Number(limit) === 0 ? totalOrdersInFetch : Number(limit));

      res.status(200).json({
        total: totalOrdersInFetch,
        page: Number(page),
        limit: Number(limit),
        orders,
      });
    } catch (error: any) {
      console.warn(error);
      res.status(400).send({ message: error.message });
    }
  }

  async getcustomerOrders(req: Request, res: Response) {
    try {
      const { customerId, filter, page = 1, limit = 10, deleted } = req.query;

      const transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;

      const searchFilter = transformFilterInObject?.search ? transformFilterInObject?.search : "";
      const numberId = Number(transformFilterInObject?.search);

      if (!customerId) return res.status(404).json({ message: "Id do cliente é obrigatório" });
      const customer = await customerModel.findById(customerId);
      const deletedIsString = typeof deleted === "string" ? deleted : "";

      if (!customer) return res.status(404).json({ message: "Cliente não encontrado" });

      const paramsOfFilter = {
        $and: [
          {
            $or: [
              {
                equipment: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                brand: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                model: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                defect: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              {
                observation: {
                  $regex: searchFilter,
                  $options: "i",
                },
              },
              { id: numberId ? numberId : null },
            ],
          },

          //filter search
          transformFilterInObject?.status ? { status: new ObjectId(transformFilterInObject?.status) } : {},
          transformFilterInObject?.customer ? { customer: new ObjectId(transformFilterInObject?.customer) } : {},
          transformFilterInObject?.dateFrom && transformFilterInObject?.dateTo
            ? {
                dateEntry: {
                  $gte: new Date(transformFilterInObject?.dateFrom),
                  $lte: new Date(transformFilterInObject?.dateTo),
                },
              }
            : {},

          deleted ? { deleted: this.deletedFilter(deletedIsString) } : {},
        ],
      };
      

      const totalCount = await orderModel.countDocuments({
       ...paramsOfFilter
      });

      // Consulta os pedidos do cliente com a paginação
      const orders = await orderModel
        .aggregate([
          {
            $match: {
              customer: customer._id,
              ...paramsOfFilter
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
        .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
        .limit(Number(limit) === 0 ? totalCount : Number(limit));

      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), orders });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter os pedidos do cliente" });
    }
  }

  async getOrderPending(req: Request, res: Response) {
    try {
      const { filter, page = 1, limit = 10, deleted } = req.query;
      const deletedIsString = typeof deleted === "string" ? deleted : "";

      const numberId = Number(filter);
      //orders
      const statusPending = await StatusModel.findOne({ name: "Aberto" });
      if (!statusPending)
        return res.status(500).send({
          error: true,
          code: "orderView.statusNotExist",
          message: "Não existe o status Aberto no banco de dados",
        });

      const count = await orderModel.countDocuments({
        $and: [
          {
            $and: [{ status: statusPending?._id }, deleted ? { deleted: this.deletedFilter(deletedIsString) } : {}],
          },
          deleted ? { deleted: this.deletedFilter(deletedIsString) } : {},
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
        .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
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

      const amount = await orderServicePrice.calculate(req.params.id, treatedServices);

      const orderAlreadyExists = await orderModel.findById(req.params.id);
      if (!orderAlreadyExists) return res.status(404).json({ message: "não foi possivel encontrar a O.S" });
      const newcustomer = await customerModel.findById(customer);
      if (!newcustomer) return res.status(404).json({ message: "não foi possivel encontrar o cliente" });

      const totalAmount = () => {
        if (discount) {
          return Number(discount);
        }
        return 0;
      };

      //retira a ordem de dentro do customer
      const orderObjectId = new mongoose.Types.ObjectId(orderAlreadyExists?._id);
      const customerOldObject = orderAlreadyExists.customer;

      if (customer !== orderAlreadyExists.customer.toString()) {
        const customerOldUpdate = await customerModel?.updateOne(
          { _id: customerOldObject },
          { $pull: { orders: orderObjectId } }
        );

        const customerIdObject = new mongoose.Types.ObjectId(newcustomer?._id);

        const customerUpdate = await customerModel?.updateOne(
          { _id: customerIdObject },
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
    try {
      const { id } = req.params;

      if (!id) return res.status(404).json({ message: "Id para a exclusão é obrigátorio" });
      const orderAlreadyExists = await orderModel.findById(req.params.id);
      if (!orderAlreadyExists) return res.status(404).json({ message: "não foi possivel encontrar a O.S" });

      const order = await orderModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
      if (!order) return res.status(404).json({ message: "ordem de serviço não encontrada" });

      res.status(200).send({ message: "Ordem de serviço apagado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Houve um erro ao apagar a ordem de serviço!" });
    }
  }
}

export const orderController = new OrderController();
