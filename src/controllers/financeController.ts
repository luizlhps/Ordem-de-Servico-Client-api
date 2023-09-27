import { Schema, model } from "mongoose";
import { Transaction, counterFinanceModel } from "../models/Finance.model";
import { Request, Response } from "express";
import { counterId } from "../utils/autoIncrementId";

class Finance {
  async createTransaction(req: Request, res: Response) {
    try {
      const { title, description, amount, type, status, order, entryDate, dueDate, payDay } = req.body;

      //validation balance
      if (type !== "debit" && type !== "credit") {
        return res.status(400).send("o tipo deve ser débito ou crédito");
      }
      //validation status
      if (status !== "open" && status !== "finished" && status !== "delayed") {
        return res.status(400).send("o status deve ser aberto ou finalizado ou atrasado");
      }
      if (status === "finished" && !payDay) {
        return res.status(400).send("É obrigatório a data de pagamento ao finalizar a transação");
      }

      const incrementId = (await counterId(counterFinanceModel)).getNextId;

      const transaction = await Transaction.create({
        id: await incrementId(),
        title,
        description,
        amount,
        type,
        status,
        order,
        entryDate,
        dueDate,
        payDay,
      });

      res.status(201).send(transaction);
    } catch (err: any) {
      console.warn(err);
      res.status(400).json({ message: err.message });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const { title, description, amount, type, status, order, entryDate, dueDate, payDay } = req.body;
    try {
      const checktransactionExists = await Transaction.findById(req.params.id);
      if (!checktransactionExists) {
        return res.status(404).json({ message: "Transação não encontrada" });
      }

      if (status === "finished" && !payDay) {
        return res.status(400).send("É obrigatório a data de pagamento ao finalizar a transação");
      }

      const updataTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: title,
            description: description,
            amount: amount,
            type: type,
            status: status,
            order: order,
            entryDate: entryDate,
            dueDate: dueDate,
            payDay: payDay,
          },
        },
        { new: true }
      );

      res.status(202).json(updataTransaction);
    } catch (error: any) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });

      res.status(200).send("Transação Deletada");
    } catch (error) {
      console.warn(error);
      res.send(400).send({ message: error });
    }
  }

  async searchTransaction(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;
    const numberId = Number(filter);

    try {
      const transaction = await Transaction.find({
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
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
      const totalCount = await Transaction.countDocuments({
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
      if (transaction.length < 1) return res.status(404).json("nada encontrado");
      res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), transaction });
    } catch (error) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }
  //[]editar futuramente
  async balance(req: Request, res: Response) {
    try {
      const allDebits = await Transaction.find({ $and: [{ status: "finished" }, { type: "debit" }] });
      const allCredits = await Transaction.find({ $and: [{ status: "finished" }, { type: "credit" }] });

      let valueTotalDebits: number = 0;

      allDebits.forEach((transation) => {
        valueTotalDebits += transation.amount;
      });

      let valueTotalCredits: number = 0;

      allCredits.forEach((transation) => {
        valueTotalCredits += transation.amount;
      });

      const balance = valueTotalCredits - valueTotalDebits;

      res.status(200).send(balance);
    } catch (error) {
      res.status(400).send("Ocorreu um Erro Ao buscar o balanço do caixa");
      console.log(error);
    }
  }

  async getByIdTransaction(req: Request, res: Response) {
    try {
      const transaction = await Transaction.findById(req.params.id);
      res.status(200).json(transaction);
    } catch (error) {
      console.warn(error);
      res.send(400).send({ message: error });
    }
  }
}

export const finance = new Finance();
