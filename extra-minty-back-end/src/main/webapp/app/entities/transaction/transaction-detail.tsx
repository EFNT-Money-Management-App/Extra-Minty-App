import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './transaction.reducer';
import { TransactionType } from '../../shared/model/enumerations/transaction-type.model';
import { TransactionCategory } from '../../shared/model/enumerations/transaction-category.model';
import transaction from 'app/entities/transaction/transaction.reducer';
import budget from 'app/entities/budget/budget.reducer';

export const TransactionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const transactionEntity = useAppSelector(state => state.transaction.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="transactionDetailsHeading">
          <Translate contentKey="extraMintyApp.transaction.detail.title">Transaction</Translate>
        </h2>
        <dl className="jh-entity-details">
          {/* <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.id}</dd> */}
          {transactionEntity.TransactionType == TransactionCategory.CUSTOM ? <><dt>
            <span id="customCategoryName">
              <Translate contentKey="extraMintyApp.transaction.customCategoryName">Custom Category Name</Translate>
            </span>
          </dt><dd>{transactionEntity.customCategoryName}</dd></> : null }
          <dt>
            <span id="type">
              <Translate contentKey="extraMintyApp.transaction.type">Type</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.type}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="extraMintyApp.transaction.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{"$" + transactionEntity.amount + ".00"}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="extraMintyApp.transaction.category">Category</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.category}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="extraMintyApp.transaction.date">Date</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.date ? <TextFormat value={transactionEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="extraMintyApp.transaction.description">Description</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.description}</dd>
          {transactionEntity.type == TransactionType.TRANSFER ? <><dt>
            <span id="transferToAccountNumber">
              <Translate contentKey="extraMintyApp.transaction.transferToAccountNumber">Transfer To Account Number</Translate>
            </span>
          </dt><dd>{transactionEntity.transferToAccountNumber}</dd></> : null}
          {transactionEntity.type == TransactionType.TRANSFER ?
          <><dt>
              <span id="transferFromAccountNumber">
                <Translate contentKey="extraMintyApp.transaction.transferFromAccountNumber">Transfer From Account Number</Translate>
              </span>
            </dt><dd>{transactionEntity.transferFromAccountNumber}</dd></> : null}
            {transactionEntity.budget ? 
            <><dt>
            <Translate contentKey="extraMintyApp.transaction.budget">Budget</Translate>
          </dt><dd>{transactionEntity.budget ? transactionEntity.budget.id : ''}</dd>
          </> : null}
          
          <dt>
            <Translate contentKey="extraMintyApp.transaction.bankAccount">Bank Account</Translate>
          </dt>
          <dd>{transactionEntity.bankAccount ? transactionEntity.bankAccount.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/useraccount" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        {/* <Button tag={Link} to={`/transaction/${transactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button> */}
      </Col>
    </Row>
  );
};

export default TransactionDetail;
