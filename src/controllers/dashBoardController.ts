import { Request, Response } from "express";
import { ITransaction, Transaction } from "../models/Finance.model";

import { amountTotal } from "./dasboardController/amountTotal";
import { finished } from "stream";
import { orderModel } from "../models/Ordermodel";
import { StatusModel } from "../models/Status.model";

class DasboardController {
  private async filterTransaction(endPreviusMonth: Date, endMonth: Date, startPreviusMonth: Date) {
    const currentMonthTransactions = await Transaction.find({
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

    return { currentMonthTransactions, transactionsPreviusMonth };
  }

  async GetAllInfo(req: Request, res: Response) {
    try {
      // previous Month - current Month
      const currentDate = new Date();
      const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const endPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      const startPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      //transactions
      const { currentMonthTransactions, transactionsPreviusMonth } = await this.filterTransaction(
        endPreviusMonth,
        endMonth,
        startPreviusMonth
      );

      if (!currentMonthTransactions) throw res.status(400).send("Houve um erro ao buscar as transações");
      if (!transactionsPreviusMonth) {
        throw res.status(400).send("Houve um erro ao buscar as transações do mês anterior");
      }

      const CountTransactions = await Transaction.countDocuments();
      if (!CountTransactions) throw res.status(400).send("Houve um erro ao buscar o total de transações");

      //Balance
      const allTransactionsDebits: ITransaction[] = [];
      const allTransactionsCredits: ITransaction[] = [];

      const Alltransactions = await Transaction.find({ deleted: false });

      Alltransactions.forEach((transaction) => {
        if (transaction.status === "finished" && transaction.type === "credit") {
          allTransactionsCredits.push(transaction);
        }

        if (transaction.status === "finished" && transaction.type === "debit") {
          allTransactionsDebits.push(transaction);
        }
      });

      let valueTotalDebits: number = 0;

      allTransactionsDebits.forEach((transation) => {
        valueTotalDebits += transation.amount;
      });

      let valueTotalCredits: number = 0;

      allTransactionsCredits.forEach((transation) => {
        valueTotalCredits += transation.amount;
      });

      const balance = valueTotalCredits - valueTotalDebits;

      //finished
      const creditPercetege = amountTotal.calculateCreditPercetegeMonth({
        transactionsPreviusMonth,
        currentMonthTransactions,
        status: "finished",
      });

      const debitPercetege = amountTotal.calculateDebitPercetegeMonth({
        transactionsPreviusMonth,
        currentMonthTransactions,
        status: "finished",
      });

      //pending
      const creditPercetegePending = amountTotal.calculateCreditPercetegeMonth({
        transactionsPreviusMonth,
        currentMonthTransactions,
        status: "open",
      });

      const debitPercetegePending = amountTotal.calculateDebitPercetegeMonth({
        transactionsPreviusMonth,
        currentMonthTransactions,
        status: "open",
      });

      const totalCountTransactionsPedding = await Transaction.countDocuments({ status: "open" });

      //balance
      const balancePercetege = amountTotal.calculateBalanceMonth(currentMonthTransactions);

      //totalCount
      const totalCount = creditPercetege.counter.MonthCredit + debitPercetege.counter.MonthDebit;
      const totalCountPrevMonth = creditPercetege.counter.prevMonthCredit + debitPercetege.counter.prevMonthDebit;

      const totalCountPercentege = amountTotal.calculatePercetege(totalCount, totalCountPrevMonth);

      //orders count
      const statusPending = await StatusModel.findOne({ name: "Aberto" });
      if (!statusPending) await StatusModel.create({ name: "Aberto" });

      const ordersCountPendingPrevMonth = await orderModel.countDocuments({
        $and: [
          {
            dateEntry: {
              $gte: new Date(startPreviusMonth),
              $lte: new Date(endPreviusMonth),
            },
          },
          { status: statusPending?._id },
          { deleted: false },
        ],
      });
      const ordersCountPending = await orderModel.countDocuments({
        $and: [
          { status: statusPending?._id },
          { deleted: false },
          {
            dateEntry: {
              $gte: new Date(endPreviusMonth),
              $lte: new Date(endMonth),
            },
          },
        ],
      });

      const ordersTotalCount = await orderModel.countDocuments({
        $and: [{ status: statusPending?._id }, { deleted: false }],
      });

      const orderPercentege = amountTotal.calculatePercetege(ordersCountPending, ordersCountPendingPrevMonth);

      //data
      const dashboard = {
        totalCount: totalCount,
        totalCountPrevMonth,
        percetege: totalCountPercentege,
        balance: { ...balancePercetege, totalAmount: balance },
        pending: {
          transaction: { totalCount: totalCountTransactionsPedding },
          credit: creditPercetegePending,
          debit: debitPercetegePending,
          orders: { totalCount: ordersTotalCount, percetege: orderPercentege },
        },
        finished: {
          credit: creditPercetege,
          debit: debitPercetege,
        },
      };

      res.status(200).send({
        ...dashboard,
        transactions: currentMonthTransactions,
        transactionsPreviusMonth,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllInfoYear(req: Request, res: Response) {
    try {
      const currentDate = new Date();

      //current year
      const currentYear = new Date(currentDate.getFullYear(), 0, 1);
      const endYear = new Date(currentDate.getFullYear(), 11, 31);

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
    } catch (error) {
      console.log(error);
    }
  }
}

export const dashboardController = new DasboardController();
