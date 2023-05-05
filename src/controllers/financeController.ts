import { Balance, Transaction } from "../models/Finance.model";
import { Request, Response } from "express";

class Finance {
  async createtransaction(req: Request, res: Response) {
    const { title, description, amount, type, status, order, entryDate, exitDate } = req.body;

    try {
      //Validação do balanço
      if (type !== "debit" && type !== "credit") {
        return res.status(400).send("o tipo deve ser débito ou crédito");
      }
      //Validação do status
      if (status !== "open" && status !== "finished" && status !== "delayed") {
        return res.status(400).send("o status deve ser aberto ou finalizado ou atrasado");
      }

      const transaction = await Transaction.create({
        title,
        description,
        amount,
        type,
        status,
        order,
        entryDate,
        exitDate,
      });

      //Atualiza o Balanço
      let balance = await Balance.findOne();
      if (!balance) {
        balance = await Balance.create({ value: 0 }); // Cria um novo documento na coleção Balance com o saldo inicial
      }

      //caso debito é negativo
      let value = amount;
      if (type === "debit") value = value * -1;
      if (status === "finished") balance.amount = balance.amount + value; //se a transação for do tipo credito e no caso ele não esteja com status finished eu não quero que ele seja contato no caixa

      await balance.save();
      res.status(201).send(transaction);
    } catch (err: any) {
      console.warn(err);
      res.status(400).json({ message: err.message });
    }
  }

  async updatetransaction(req: Request, res: Response) {
    const { title, description, amount, type, status, order, entryDate, exitDate } = req.body;
    try {
      const checktransactionExists = await Transaction.findById(req.params.id);
      if (!checktransactionExists) {
        return res.status(404).json({ message: "Transação não encontrada" });
      }

      //atualiza o balance caso o status seja finalizad e que o tipo seja credito

      const amounttransaction = checktransactionExists;
      const oldAmount = checktransactionExists.amount;
      const newAmount = amount;
      let balance = await Balance.findOne();
      if (balance) {
        if (
          status === "finished" &&
          type === "credit" &&
          amounttransaction.status !== "finished"
        ) {
          balance.amount = balance.amount + oldAmount;
          await balance.save();
        }

        if (oldAmount < newAmount) {
          balance.amount = balance.amount + newAmount - oldAmount;
          await balance.save();
        }

        if (oldAmount > newAmount && newAmount !== 0) {
          balance.amount = balance.amount - (oldAmount - newAmount);
          await balance.save();
        }
        if (newAmount === 0) {
          balance.amount = balance.amount - oldAmount;
          await balance.save();
        }
      }
      const updatatransaction = await Transaction.findByIdAndUpdate(
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
            exitDate: exitDate,
          },
        },
        { new: true }
      );
      res.status(202).json(updatatransaction);
    } catch (error: any) {
      console.warn(error);
      res.status(400).send({ message: error });
    }
  }

  async deletetransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByIdAndDelete(id);
      const checktransactionExists = await Balance.findOne();

      if (checktransactionExists) {
        const oldAmount = checktransactionExists.amount;

        let balance = await Balance.findOne();
        if (balance) {
          balance.amount = balance.amount - oldAmount;
          console.log(oldAmount);
          await balance.save();
        }
      }
      res.status(200).send("Transação Deletada");
    } catch (error) {
      console.warn(error);
      res.send(400).send({ message: error });
    }
  }

  async getAlltransaction(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const transaction = await Transaction.find();
      res.status(200).json(transaction);
    } catch (error) {}
  }
}

export const finance = new Finance();
