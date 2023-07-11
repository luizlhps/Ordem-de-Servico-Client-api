import { Balance, IBalance } from "../../models/Finance.model";

class BalanceDashBoard {
  public async amountBalance(balance: IBalance) {
    try {
    } catch (error) {}
  }
}

export const balanceDashBoard = new BalanceDashBoard();

//caixa (porcentagem aumento ou diminuição com base faturamento mes tual - divida mes atual / faturamento mes atual = caso o valor for negativo *1 e retornar 2 parametros negative: true, amount)
