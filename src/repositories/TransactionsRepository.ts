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
    const normalize = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(dataItem => {
      if (dataItem.type === 'income') {
        normalize.income += dataItem.value;
      } else if (dataItem.type === 'outcome') {
        normalize.outcome += dataItem.value;
      }
    });
    normalize.total = normalize.income - normalize.outcome;
    const balance = this.getBalance({
      ...normalize,
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
