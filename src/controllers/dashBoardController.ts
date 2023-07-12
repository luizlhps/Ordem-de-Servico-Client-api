import { Request, Response } from "express";
import { Balance, Transaction } from "../models/Finance.model";

import { amountTotal } from "./dasboardController/amountTotal";
import { finished } from "stream";

class DasboardController {
  private async batata(endPreviusMonth: Date, endMonth: Date, startPreviusMonth: Date) {
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

    return { transactions, transactionsPreviusMonth };
  }

  async GetAllInfo(req: Request, res: Response) {
    try {
      // previous Month - current Month
      const currentDate = new Date();
      const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const endPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      const startPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      //transactions
      const { transactions, transactionsPreviusMonth } = await this.batata(
        endPreviusMonth,
        endMonth,
        startPreviusMonth
      );

      if (!transactions) throw res.status(400).send("Houve um erro ao buscar as transações");
      if (!transactionsPreviusMonth) {
        throw res.status(400).send("Houve um erro ao buscar as transações do mês anterior");
      }

      console.log(endPreviusMonth, endMonth);

      const CountTransactions = await Transaction.countDocuments();
      if (!CountTransactions) throw res.status(400).send("Houve um erro ao buscar o total de transações");

      const balance = await Balance.findOne();
      if (!balance) throw res.status(400).send("Houve um erro ao buscar o balanço do caixa");

      //finished
      const creditPercetege = amountTotal.calculateCreditPercetegeMonth({
        transactionsPreviusMonth,
        transactions,
        status: "finished",
      });

      console.log({ credit: creditPercetege });

      const debitPercetege = amountTotal.calculateDebitPercetegeMonth({
        transactionsPreviusMonth,
        transactions,
        status: "finished",
      });

      console.log({ debit: debitPercetege });

      //pending
      const creditPercetegePending = amountTotal.calculateCreditPercetegeMonth({
        transactionsPreviusMonth,
        transactions,
        status: "open",
      });

      console.log({ creditPending: creditPercetegePending });

      const debitPercetegePending = amountTotal.calculateDebitPercetegeMonth({
        transactionsPreviusMonth,
        transactions,
        status: "open",
      });

      console.log({ debitPending: debitPercetegePending });

      //balance
      const balancePercetege = amountTotal.calculateBalanceMonth(transactions);

      console.log("balanço", balancePercetege);

      //totalCount
      const totalCount = creditPercetege.counter.MonthCredit + debitPercetege.counter.MonthDebit;
      const totalCountPrevMonth = creditPercetege.counter.prevMonthCredit + debitPercetege.counter.prevMonthDebit;

      const totalCountPercentege = amountTotal.calculatePercetege(totalCount, totalCountPrevMonth);

      //data
      const results = {
        totalCount: totalCount,
        totalCountPrevMonth,
        percetege: totalCountPercentege,
        balance: balancePercetege,
        pending: {
          credit: creditPercetegePending,
          debit: debitPercetegePending,
        },
        finished: {
          credit: creditPercetege,
          debit: debitPercetege,
        },
      };

      res.status(200).send({ ...results });
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
