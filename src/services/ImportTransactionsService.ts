import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

import CreateTransactionService from './CreateTransactionService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();

    const file = path.join(uploadConfig.directory, filename);

    const resultData = await csv().fromFile(file);

    for (const item of resultData) {
      await createTransactionService.execute(item);
    }

    const fileExists = await fs.promises.stat(file);
    // remover arquivo dps do upload
    if (fileExists) {
      await fs.promises.unlink(file);
    }

    return resultData;
  }
}

export default ImportTransactionsService;
