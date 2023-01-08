import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITransaction } from 'app/shared/model/transaction.model';
import { getEntities } from './transaction.reducer';

export const Transaction = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const transactionList = useAppSelector(state => state.transaction.entities);
  const loading = useAppSelector(state => state.transaction.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="transaction-heading" data-cy="TransactionHeading">
        <Translate contentKey="extraMintyApp.transaction.home.title">Transactions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="extraMintyApp.transaction.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/transaction/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="extraMintyApp.transaction.home.createLabel">Create new Transaction</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {transactionList && transactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.customCategoryName">Custom Category Name</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.transferToAccountNumber">Transfer To Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.transferFromAccountNumber">Transfer From Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.budget">Budget</Translate>
                </th>
                <th>
                  <Translate contentKey="extraMintyApp.transaction.bankAccount">Bank Account</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactionList.map((transaction, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/transaction/${transaction.id}`} color="link" size="sm">
                      {transaction.id}
                    </Button>
                  </td>
                  <td>{transaction.customCategoryName}</td>
                  <td>
                    <Translate contentKey={`extraMintyApp.TransactionType.${transaction.type}`} />
                  </td>
                  <td>{transaction.amount}</td>
                  <td>
                    <Translate contentKey={`extraMintyApp.TransactionCategory.${transaction.category}`} />
                  </td>
                  <td>{transaction.date ? <TextFormat type="date" value={transaction.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.transferToAccountNumber}</td>
                  <td>{transaction.transferFromAccountNumber}</td>
                  <td>{transaction.budget ? <Link to={`/budget/${transaction.budget.id}`}>{transaction.budget.id}</Link> : ''}</td>
                  <td>
                    {transaction.bankAccount ? (
                      <Link to={`/bank-account/${transaction.bankAccount.id}`}>{transaction.bankAccount.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/transaction/${transaction.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/transaction/${transaction.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/transaction/${transaction.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="extraMintyApp.transaction.home.notFound">No Transactions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Transaction;
