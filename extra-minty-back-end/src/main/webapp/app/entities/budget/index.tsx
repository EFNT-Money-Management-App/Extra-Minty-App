import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Budget from './budget';
import BudgetDetail from './budget-detail';
import BudgetUpdate from './budget-update';
import BudgetDeleteDialog from './budget-delete-dialog';

const BudgetRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Budget />} />
    <Route path="new" element={<BudgetUpdate />} />
    <Route path=":id">
      <Route index element={<BudgetDetail />} />
      <Route path="edit" element={<BudgetUpdate />} />
      <Route path="delete" element={<BudgetDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BudgetRoutes;
