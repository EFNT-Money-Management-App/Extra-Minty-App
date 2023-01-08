import dayjs from 'dayjs';
import { IBudget } from 'app/shared/model/budget.model';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';
import { TransactionCategory } from 'app/shared/model/enumerations/transaction-category.model';

export interface ITransaction {
  id?: number;
  customCategoryName?: string | null;
  type?: TransactionType | null;
  amount?: number | null;
  category?: TransactionCategory | null;
  date?: string | null;
  description?: string | null;
  transferToAccountNumber?: number | null;
  transferFromAccountNumber?: number | null;
  budget?: IBudget | null;
  bankAccount?: IBankAccount | null;
}

export const defaultValue: Readonly<ITransaction> = {};
