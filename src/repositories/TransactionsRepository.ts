import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(item => item.type === 'income')
      .reduce((total, { value }) => {
        return total + value;
      }, 0);

    const outcomes = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((total, { value }) => {
        return total + value;
      }, 0);

    const total = incomes - outcomes;

    const balance = {
      income: incomes,
      outcome: outcomes,
      total,
    };

    return balance;
  }

  public create(data: CreateTransaction): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
