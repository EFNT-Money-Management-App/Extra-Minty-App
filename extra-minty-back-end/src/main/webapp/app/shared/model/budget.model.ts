import { IUser } from 'app/shared/model/user.model';
import { ITransaction } from 'app/shared/model/transaction.model';
import { Month } from 'app/shared/model/enumerations/month.model';

export interface IBudget {
  id?: number;
  spendingLimit?: number | null;
  currentSpending?: number | null;
  name?: string | null;
  monthOfDate?: Month | null;
  budgetYear?: number | null;
  user?: IUser | null;
  transactions?: ITransaction[] | null;
}

export const defaultValue: Readonly<IBudget> = {};
