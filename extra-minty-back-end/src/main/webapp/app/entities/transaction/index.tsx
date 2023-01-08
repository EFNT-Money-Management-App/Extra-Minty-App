import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Transaction from './transaction';
import TransactionDetail from './transaction-detail';
import TransactionUpdate from './transaction-update';
import TransactionDeleteDialog from './transaction-delete-dialog';

const TransactionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Transaction />} />
    <Route path="new" element={<TransactionUpdate />} />
    <Route path=":id">
      <Route index element={<TransactionDetail />} />
      <Route path="edit" element={<TransactionUpdate />} />
      <Route path="delete" element={<TransactionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TransactionRoutes;
