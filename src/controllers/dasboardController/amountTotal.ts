import { ITransaction, Transaction } from "../../models/Finance.model";

interface ITransactionsProps {
  transactionsPreviusMonth: ITransaction[];
  transactions: ITransaction[];
  status: "finished" | "open";
}

class AmountTotal {
  public calculatePercetege(quantity: number, refBase: number) {
    if (refBase === 0) {
      return 0;
    }

    const value = ((quantity - refBase) / refBase) * 100;
    return value.toFixed(2);
  }

  public calculateCreditPercetegeMonth({ transactionsPreviusMonth, transactions, status }: ITransactionsProps) {
    let countprevMonth: number = 0;
    let countMonth: number = 0;

    const prevMonth = transactionsPreviusMonth.reduce((acc: number, current) => {
      if (current.type === "credit" && current.status === status) {
        countprevMonth++;
        acc += current.amount;
      }
      return acc;
    }, 0);

    const month = transactions.reduce((acc: number, current) => {
      if (current.type === "credit" && current.status === status) {
        countMonth++;
        acc += current.amount;
      }
      return acc;
    }, 0);

    const calculateCredit = {
      percetege: this.calculatePercetege(month, prevMonth),
      amountMonth: month,
      amountPrevMonth: prevMonth,
      counter: {
        MonthCredit: countMonth,
        prevMonthCredit: countprevMonth,
        percentege: this.calculatePercetege(countMonth, countprevMonth),
      },
    };

    return calculateCredit;
  }

  public calculateDebitPercetegeMonth({ transactionsPreviusMonth, transactions, status }: ITransactionsProps) {
    let countprevMonth: number = 0;
    let countMonth: number = 0;

    const prevMonth = transactionsPreviusMonth.reduce((acc: number, current) => {
      if (current.type === "debit" && current.status === status) {
        countprevMonth++;
        acc += current.amount;
      }

      return acc;
    }, 0);

    const month = transactions.reduce((acc: number, current) => {
      if (current.type === "debit" && current.status === status) {
        countMonth++;

        acc += current.amount;
      }

      return acc;
    }, 0);

    const calculateCredit = {
      percetege: this.calculatePercetege(month, prevMonth),
      amountMonth: month,
      amountPrevMonth: prevMonth,
      counter: {
        MonthDebit: countMonth,
        prevMonthDebit: countprevMonth,
        percentege: this.calculatePercetege(countMonth, countprevMonth),
      },
    };
    return calculateCredit;
  }

  public calculateBalanceMonth(transactionsMonth: ITransaction[]) {
    const monthCredit = transactionsMonth.reduce((acc: number, current) => {
      if (current.type === "credit" && current.status === "finished") {
        acc += current.amount;
      }
      return acc;
    }, 0);

    const monthDebit = transactionsMonth.reduce((acc: number, current) => {
      if (current.type === "debit" && current.status === "finished") {
        acc += current.amount;
      }
      return acc;
    }, 0);

    const calculateCredit = {
      percetege: this.calculatePercetege(monthCredit, monthDebit),
      totalAmountCredit: monthCredit,
      totalAmountDebit: monthDebit,
    };
    return calculateCredit;
  }

  public async countTransactions(endPreviusMonth: Date, endMonth: Date, startPreviusMonth: Date) {
    //pendentes total
    const transactionsPendingCount = await Transaction.countDocuments({
      $and: [
        {
          entryDate: {
            $gte: new Date(endPreviusMonth),
            $lte: new Date(endMonth),
          },
        },
        { status: "open" },
        { deleted: false },
      ],
    });

    const transactionsFinishedCount = await Transaction.countDocuments({
      $and: [
        {
          entryDate: {
            $gte: new Date(endPreviusMonth),
            $lte: new Date(endMonth),
          },
        },
        { status: "finished" },
        { deleted: false },
      ],
    });

    //pendentes mes anterior
    const transactionsCountFinishedPreviusMonth = await Transaction.countDocuments({
      $and: [
        {
          entryDate: {
            $gte: new Date(startPreviusMonth),
            $lte: new Date(endPreviusMonth),
          },
        },
        { status: "finished" },
        { deleted: false },
      ],
    });
    const transactionsCountPendingPreviusMonth = await Transaction.countDocuments({
      $and: [
        {
          entryDate: {
            $gte: new Date(startPreviusMonth),
            $lte: new Date(endPreviusMonth),
          },
        },
        { status: "open" },
        { deleted: false },
      ],
    });

    const transactionsCountDebitPendingPreviusMonth = await Transaction.countDocuments({
      $and: [
        {
          entryDate: {
            $gte: new Date(startPreviusMonth),
            $lte: new Date(endPreviusMonth),
          },
        },
        { type: "debit" },
        { status: "open" },
        { deleted: false },
      ],
    });

    //pendentes debitos
    const transactionsDebitPendingCount = await Transaction.countDocuments({
      $and: [
        {
          entryDate: {
            $gte: new Date(endPreviusMonth),
            $lte: new Date(endMonth),
          },
        },
        { type: "debit" },
        { status: "open" },
        { deleted: false },
      ],
    });

    const transactionsCount = {
      total: {
        pending: transactionsPendingCount,
        pendingPercetege: this.calculatePercetege(transactionsFinishedCount, transactionsCountFinishedPreviusMonth),
        finished: transactionsCountFinishedPreviusMonth,
        finishedPercetege: this.calculatePercetege(transactionsPendingCount, transactionsCountPendingPreviusMonth),
      },
      debit: {
        pending: transactionsDebitPendingCount,
        percetege: this.calculatePercetege(transactionsDebitPendingCount, transactionsCountDebitPendingPreviusMonth),
      },
    };
    return transactionsCount;
  }

  public calculatePercetegeYear() {}
}

export const amountTotal = new AmountTotal();
