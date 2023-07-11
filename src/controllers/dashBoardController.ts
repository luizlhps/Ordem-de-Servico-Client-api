import { Request, Response } from "express";
import { Balance, Transaction } from "../models/Finance.model";
import { balanceDashBoard } from "./dasboardController/balanceDashboard";

class DasboardController {
  async GetAllInfo(req: Request, res: Response) {
    try {
      const { filter } = req.query;
      const filterValidation = ["month", "year"];

      if (typeof filter !== "string") throw new Error("filter precisa ser do tipo string");

      if (!filterValidation.includes(filter)) throw new Error("filter precisa ser do tipo month ou year");

      // previous Month - current Month
      const currentDate = new Date();
      const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const endPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      const startPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      //current year
      const currentYear = new Date(currentDate.getFullYear(), 0, 1);
      const endYear = new Date(currentDate.getFullYear(), 11, 31);

      console.log(endPreviusMonth.toISOString());
      console.log(startPreviusMonth.toISOString());
      console.log(endMonth.toISOString());

      const CountTransactions = await Transaction.countDocuments();
      if (!CountTransactions) throw res.status(400).send("Houve um erro ao buscar o total de transações");

      const balance = await Balance.findOne();
      if (!balance) throw res.status(400).send("Houve um erro ao buscar o balanço do caixa");

      if (filter === "month") {
        const transactions = await Transaction.find({
          $and: [
            {
              entryDate: {
                $gte: new Date(endPreviusMonth),
                $lte: new Date(endMonth),
              },
            },
            { deleted: false },
          ],
        });

        const transactionsPreviusMonth = await Transaction.find({
          $and: [
            {
              entryDate: {
                $gte: new Date(startPreviusMonth),
                $lte: new Date(endPreviusMonth),
              },
            },
            { deleted: false },
          ],
        });
        if (!transactions) throw res.status(400).send("Houve um erro ao buscar as transações");
        if (!transactionsPreviusMonth) {
          throw res.status(400).send("Houve um erro ao buscar as transações do mês anterior");
        }

        //Amount Debit
        const amountTotalDebitFinishedMonth = transactions.reduce((acc: any, current) => {
          if (current.type === "debit" && current.status === "finished") {
            console.log(current);
            acc += current.amount;
          }
          return acc;
        }, 0);

        //Amount Debit
        const amountTotalDebitOpenMonth = transactions.reduce((acc: any, current) => {
          if (current.type === "debit" && current.status === "open") {
            acc += current.amount;
          }
          return acc;
        }, 0);

        //Amount credit
        const amountTotalCreditPreviusMonth = transactions.reduce((acc: any, current) => {
          if (current.type === "credit" && current.status === "finished") {
            acc += current.amount;
          }
          return acc;
        }, 0);

        console.log(amountTotalDebitFinishedMonth);
        console.log(amountTotalCreditPreviusMonth);

        //credit
        const allTransactionsCredit = transactions.filter((item) => {
          return item.type === "credit";
        });

        const transactionsPendingsCredit = allTransactionsCredit.filter((item) => {
          return item.status === "open";
        });

        const transactionsFinishedsCredit = allTransactionsCredit.filter((item) => {
          return item.status === "finished";
        });

        //debit
        const allTransactionsDebit = transactions.filter((item) => {
          return item.type == "debit";
        });

        const transactionsPendingsDebit = allTransactionsDebit.filter((item) => {
          return item.status === "open";
        });

        const transactionsFinishedsDebit = allTransactionsDebit.filter((item) => {
          return item.status === "finished";
        });

        res.status(200).send(transactions);
      }

      if (filter === "year") {
        const transactions = await Transaction.find({
          $and: [
            {
              entryDate: {
                $gte: new Date(currentYear),
                $lte: new Date(endYear),
              },
            },
            { deleted: false },
          ],
        });
        if (!transactions) throw res.status(400).send("Houve um erro ao buscar as transações");

        res.status(200).send(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const dashboardController = new DasboardController();

//dividas:{ pendentes / finalizados } (porcentagem com base quantidade dividas mes atual - mes anterior / mes anterior)
//faturamento:{ pendentes / finalizados }
//quantidade transações : {abertos / fechados}
//quantidade de novos clientes

//filtros dia / mes / ano
