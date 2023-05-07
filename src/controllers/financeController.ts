import { Balance, Transaction } from "../models/Finance.model";
import { Request, Response } from "express";

class Finance {
  async createTransaction(req: Request, res: Response) {
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
      if (type === "debit" && status === "finished") value = value * -1;
      if (status === "finished") balance.amount = balance.amount + value; //se a transação for do tipo credito e no caso ele não esteja com status finished eu não quero que ele seja contato no caixa

      await balance.save();
      res.status(201).send(transaction);
    } catch (err: any) {
      console.warn(err);
      res.status(400).json({ message: err.message });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const { title, description, amount, type, status, order, entryDate, exitDate } = req.body;
    try {
      const checktransactionExists = await Transaction.findById(req.params.id);
      if (!checktransactionExists) {
        return res.status(404).json({ message: "Transação não encontrada" });
      }

      //atualiza o balance caso o status seja finalizad e que o tipo seja credito

      const amountTransaction = checktransactionExists;
      const oldAmount = checktransactionExists.amount;
      const oldType = checktransactionExists.type;
      const newAmount = amount;
      const newType = type;
      let balance = await Balance.findOne();

      //trocar para um switch case
      if (balance) {
        //credito
        if (
          oldType === newType &&
          status === "finished" &&
          type === "credit" &&
          amountTransaction.status !== "finished"
        ) {
          balance.amount = balance.amount + oldAmount;
          await balance.save();
        } else if (status === "finished" && type === "credit" && oldType === newType) {
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

        //debito
        if (
          oldType === newType &&
          status === "finished" &&
          type === "debit" &&
          amountTransaction.status !== "finished"
        ) {
          balance.amount = balance.amount + oldAmount * -1;
          await balance.save();
        } else if (status === "finished" && type === "debit" && oldType === newType) {
          if (oldAmount < newAmount) {
            balance.amount = balance.amount - (newAmount - oldAmount);
            await balance.save();
          }
          if (oldAmount > newAmount && newAmount !== 0) {
            balance.amount = balance.amount - (oldAmount - newAmount);
            await balance.save();
          }
          if (newAmount === 0) {
            balance.amount = balance.amount + oldAmount;
            await balance.save();
          }
        }

        if (oldType === "credit" && newType === "debit") {
          console.log("debito");
          console.log(balance.amount);
          if (balance.amount < 0) {
            balance.amount = balance.amount + oldAmount * -2;
          } else {
            newAmount < oldAmount
              ? (balance.amount = balance.amount - newAmount)
              : (balance.amount = balance.amount - newAmount - oldAmount);
          }
          await balance.save();
        }
        if (oldType === "debit" && newType === "credit") {
          console.log("opa");
          newAmount
            ? (balance.amount = balance.amount + newAmount)
            : (balance.amount = balance.amount + oldAmount);
          await balance.save();
        }
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
            exitDate: exitDate,
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
      const transaction = await Transaction.findByIdAndDelete(id);
      const checktransactionExists = await Balance.findOne();
      const transactionExists = await Transaction.findOne();

      if (checktransactionExists && transactionExists) {
        const oldAmount = checktransactionExists.amount;
        const oldType = transactionExists.type;

        let balance = await Balance.findOne();
        if (balance) {
          if (oldType === "credit") {
            balance.amount = balance.amount - oldAmount;
            console.log(oldAmount);
            await balance.save();
          } else if (oldType === "debit") {
            balance.amount = balance.amount + oldAmount;
            console.log(oldAmount);
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
    const { query } = req.query;
    try {
      const transaction = await Transaction.find().find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { id: { query } },
        ],
      });
      res.status(200).json(transaction);
    } catch (error) {
      console.warn(error);
      res.send(400).send({ message: error });
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
