import { Request, Response } from "express";
import { Balance, Transaction } from "../models/Finance.model";
import { balanceDashBoard } from "./dasboardController/balanceDashboard";

class DasboardController {
  async GetAllInfo(req: Request, res: Response) {
    try {
      const { filter } = req.query;

      // previous Month - current Month
      const currentDate = new Date();
      const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

      //current year
      const currentYear = new Date(currentDate.getFullYear(), 0, 1);
      const endYear = new Date(currentDate.getFullYear(), 11, 31);

      console.log(startMonth.toISOString());
      console.log(previousMonth.toISOString());

      const balance = await Balance.findOne();
      if (!balance) throw res.status(400).send("Houve um erro ao buscar o balanço do caixa");

      if (filter === "month") {
        const transactions = await Transaction.find({
          $and: [
            {
              entryDate: {
                $gte: new Date(previousMonth),
                $lte: new Date(startMonth),
              },
            },
          ],
        });
        if (!transactions) throw res.status(400).send("Houve um erro ao buscar as transações");

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
          ],
        });
        if (!transactions) throw res.status(400).send("Houve um erro ao buscar as transações");

        res.status(200).send(transactions);
      }

      const CountTransactions = await Transaction.countDocuments();
      if (!CountTransactions) throw res.status(400).send("Houve um erro ao buscar o total de transações");
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
