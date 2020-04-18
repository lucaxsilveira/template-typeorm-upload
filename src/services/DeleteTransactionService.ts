import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    if (!isUuid(id)) {
      throw new AppError('Invalid transaction');
    }

    const transactionExists = await transactionsRepository.findOne({
      where: { id },
    });

    if (!transactionExists) {
      throw new AppError('Invalid transaction');
    }

    await transactionsRepository.remove(transactionExists);
  }
}

export default DeleteTransactionService;
