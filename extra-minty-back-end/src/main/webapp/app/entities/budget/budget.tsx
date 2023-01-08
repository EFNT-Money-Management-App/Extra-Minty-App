import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBudget } from 'app/shared/model/budget.model';
import { getEntities } from './budget.reducer';

export const Budget = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const budgetList = useAppSelector(state => state.budget.entities);
  const loading = useAppSelector(state => state.budget.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="budget-heading" data-cy="BudgetHeading">
        <Translate contentKey="extraMintyApp.budget.home.title">Budgets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="extraMintyApp.budget.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/budget/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="extraMintyApp.budget.home.createLabel">Create new Budget</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {budgetList && budgetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="extraMintyApp.budget.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.budget.spendingLimit">Spending Limit</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.budget.currentSpending">Current Spending</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.budget.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.budget.monthOfDate">Month Of Date</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.budget.budgetYear">Budget Year</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.budget.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {budgetList.map((budget, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/budget/${budget.id}`} color="link" size="sm">
                      {budget.id}
                    </Button>
                  </td>
                  <td>{budget.spendingLimit}</td>
                  <td>{budget.currentSpending}</td>
                  <td>{budget.name}</td>
                  <td>
                    <Translate contentKey={`extraMintyApp.Month.${budget.monthOfDate}`} />
                  </td>
                  <td>{budget.budgetYear}</td>
                  <td>{budget.user ? budget.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/budget/${budget.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/budget/${budget.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/budget/${budget.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="extraMintyApp.budget.home.notFound">No Budgets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Budget;
