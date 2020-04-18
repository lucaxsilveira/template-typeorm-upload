import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const sumIncome: number = this.sumByType(transactions, 'income');
    const sumOutcome: number = this.sumByType(transactions, 'outcome');

    return {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };
  }

  public sumByType(
    transactions: Array<Transaction>,
    type: 'income' | 'outcome',
  ): number {
    if (transactions.length <= 0) {
      return 0;
    }
    const soma = transactions.reduce(
      (acumulador, valorAtual) =>
        valorAtual.type === type
          ? acumulador + Number(valorAtual.value)
          : acumulador + 0,
      0,
    );
    return soma;
  }
}

export default TransactionsRepository;
