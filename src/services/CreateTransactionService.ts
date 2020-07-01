import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transactional = new Transaction({ title, value, type });
    const response = this.transactionsRepository.all();
    if (response.balance.total - value < 0 && type === 'outcome') {
      throw new Error('Invalid Balance.');
    }
    return this.transactionsRepository.create(transactional);
  }
}

export default CreateTransactionService;
