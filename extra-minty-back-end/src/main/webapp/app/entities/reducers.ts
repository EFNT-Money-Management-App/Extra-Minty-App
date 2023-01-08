import profile from 'app/entities/profile/profile.reducer';
import bankAccount from 'app/entities/bank-account/bank-account.reducer';
import transaction from 'app/entities/transaction/transaction.reducer';
import budget from 'app/entities/budget/budget.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  profile,
  bankAccount,
  transaction,
  budget,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
