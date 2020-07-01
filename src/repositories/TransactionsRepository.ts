import Transaction from '../models/Transaction';

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance | null;

  constructor() {
    this.transactions = [];
    this.balance = null;
  }

  public all(): Response {
    const incomes = this.transactions.filter(item => item.type === 'income');
    const outcomes = this.transactions.filter(item => item.type === 'outcome');

    const totalIncome =
      incomes.length > 0
        ? incomes.map(item => item.value).reduce((accum, curr) => accum + curr)
        : 0;

    const totalOutcome =
      outcomes.length > 0
        ? outcomes.map(item => item.value).reduce((accum, curr) => accum + curr)
        : 0;

    const a = this.transactions.reduce((acc, curr) => {
      return acc.value + curr.value;
    });

    const total = totalIncome - totalOutcome;
    const balance = this.getBalance({
      income: totalIncome,
      outcome: totalOutcome,
      total,
    });

    const response = {
      transactions: this.transactions,
      balance,
    };
    return response;
  }

  public getBalance({ income, outcome, total }: Balance): Balance {
    this.balance = {
      income,
      outcome,
      total,
    };
    return this.balance;
  }

  public create({ id, title, value, type }: Transaction): Transaction {
    const transactional = {
      id,
      title,
      value,
      type,
    };
    this.transactions.push(transactional);
    return transactional;
  }
}

export default TransactionsRepository;
