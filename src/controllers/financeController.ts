import { Schema, model } from "mongoose";
import { Balance, Transaction, counterFinanceModel } from "../models/Finance.model";
import { Request, Response } from "express";
import { counterId } from "../utils/autoIncrementId";

class Finance {
  private async updateCalculateDebit(
    oldType: string,
    newType: string,
    status: string,
    type: string,
    amountTransaction: any,
    balance: any,
    oldAmount: number,
    newAmount: number
  ) {
    switch (true) {
      case oldType === newType && status === "finished" && type === "debit" && amountTransaction.status !== "finished":
        balance.amount = balance.amount + newAmount * -1;
        break;
      case oldType === newType && status === "finished" && type === "debit" && amountTransaction.status !== "finished":
        balance.amount = balance.amount + newAmount * -1;
        break;
      case status === "finished" && type === "debit" && oldType === newType:
        if (oldAmount <= newAmount) {
          balance.amount = balance.amount - (newAmount - oldAmount);
        }
        if (oldAmount > newAmount && newAmount !== 0) {
          balance.amount = balance.amount + (oldAmount - newAmount);
        }
        if (newAmount === 0) {
          balance.amount = balance.amount + oldAmount;
        }
        break;
      default:
        break;
    }
    await balance.save();
  }
  private async updateCalculateCredit(
    oldType: string,
    newType: string,
    status: string,
    type: string,
    amountTransaction: any,
    balance: any,
    oldAmount: number,
    newAmount: number
  ) {
    if (oldType === newType && status === "finished" && type === "credit" && amountTransaction.status !== "finished") {
      balance.amount += newAmount;
    } else if (status === "finished" && type === "credit" && oldType === newType) {
      if (oldAmount < newAmount) {
        balance.amount = balance.amount + newAmount - oldAmount;
      }

      if (oldAmount > newAmount && newAmount !== 0) {
        balance.amount = balance.amount - (oldAmount - newAmount);
      }
      if (newAmount === 0) {
        balance.amount = balance.amount - oldAmount;
      }
    }
  }

  private async updateCalculateCreditForDebit(
    oldType: string,
    newType: string,
    balance: any,
    oldAmount: number,
    newAmount: number
  ) {
    if (oldType === "credit" && newType === "debit") {
      if (balance.amount < 0) {
        balance.amount = balance.amount + oldAmount * -2;
      } else {
        newAmount <= oldAmount
          ? (balance.amount = balance.amount - newAmount)
          : (balance.amount = balance.amount - newAmount - oldAmount);
      }
    }
  }
  private async updateCalculateDebitForCredit(
    oldType: string,
    newType: string,
    balance: any,
    oldAmount: number,
    newAmount: number
  ) {
    if (oldType === "debit" && newType === "credit") {
      newAmount ? (balance.amount = balance.amount + newAmount) : (balance.amount = balance.amount + oldAmount);
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const { title, description, amount, type, status, order, entryDate, dueDate, payDay } = req.body;

      console.log(dueDate, payDay);

      //validation balance
      if (type !== "debit" && type !== "credit") {
        return res.status(400).send("o tipo deve ser débito ou crédito");
      }
      //validation status
      if (status !== "open" && status !== "finished" && status !== "delayed") {
        return res.status(400).send("o status deve ser aberto ou finalizado ou atrasado");
      }

      if (!type && status === "finished" && !payDay) {
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

      //update balance
      let balance = await Balance.findOne();
      if (!balance) {
        //create a new document in the colection 'Balance' with the balance initial
        balance = await Balance.create({ value: 0 });
      }

      //case debit negative
      let value = amount;
      if (type === "debit" && status === "finished") value = value * -1;
      if (status === "finished") balance.amount = balance.amount + value; //if the transaction for the type of credit and case he not with status finished, he not calculete in balance

      await balance.save();
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

      if (!type && status === "finished" && !payDay) {
        return res.status(400).send("É obrigatório a data de pagamento ao finalizar a transação");
      }

      //update balance case the status is 'finished' and the type is credit

      const amountTransaction = checktransactionExists;
      const oldAmount = checktransactionExists.amount;
      const oldType = checktransactionExists.type;
      const newAmount = Number(amount);
      const newType = type;
      let balance = await Balance.findOne();

      if (balance && newAmount) {
        //credit
        this.updateCalculateCredit(
          oldType,
          newType,
          status,
          type,
          amountTransaction,
          balance,
          oldAmount,
          Number(newAmount)
        );

        //debit
        this.updateCalculateDebit(
          oldType,
          newType,
          status,
          type,
          amountTransaction,
          balance,
          oldAmount,
          Number(newAmount)
        );

        //credit for debit
        this.updateCalculateCreditForDebit(oldType, newType, balance, oldAmount, Number(newAmount));

        //debit for credit
        this.updateCalculateDebitForCredit(oldType, newType, balance, oldAmount, Number(newAmount));

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

        await balance.save();

        res.status(202).json(updataTransaction);
      }
    } catch (error: any) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByIdAndUpdate(req.params.id, { deleted: true });
      const checktransactionExists = await Balance.findOne();

      if (checktransactionExists && transaction) {
        const oldAmount = transaction.amount;
        const oldType = transaction.type;
        console.log(transaction);
        let balance = await Balance.findOne();
        if (balance) {
          if (oldType === "credit" && transaction.status === "finished") {
            console.log("hihi");

            if (balance.amount - oldAmount >= 0) {
              balance.amount = balance.amount - oldAmount;
            } else {
              balance.amount = 0;
            }

            console.log(balance.amount, oldAmount);
            await balance.save();
          } else if (oldType === "debit" && transaction.status === "finished") {
            console.log("hihi2");
            balance.amount = balance.amount + oldAmount;
            await balance.save();
          }
        }
      }
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
      const balance = await Balance.find();
      res.status(200).send(balance[0]);
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
