import { ITransaction } from 'app/shared/model/transaction.model';
import { IUser } from 'app/shared/model/user.model';
import { BankAccountType } from 'app/shared/model/enumerations/bank-account-type.model';

export interface IBankAccount {
  id?: number;
  balance?: number | null;
  accountNumber?: number | null;
  routingNumber?: number | null;
  bankName?: string | null;
  type?: BankAccountType | null;
  transactions?: ITransaction[] | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IBankAccount> = {};
