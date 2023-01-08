import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './budget.reducer';

export const BudgetDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const budgetEntity = useAppSelector(state => state.budget.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="budgetDetailsHeading">
          <Translate contentKey="extraMintyApp.budget.detail.title">Budget</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{budgetEntity.id}</dd>
          <dt>
            <span id="spendingLimit">
              <Translate contentKey="extraMintyApp.budget.spendingLimit">Spending Limit</Translate>
            </span>
          </dt>
          <dd>{budgetEntity.spendingLimit}</dd>
          <dt>
            <span id="currentSpending">
              <Translate contentKey="extraMintyApp.budget.currentSpending">Current Spending</Translate>
            </span>
          </dt>
          <dd>{budgetEntity.currentSpending}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="extraMintyApp.budget.name">Name</Translate>
            </span>
          </dt>
          <dd>{budgetEntity.name}</dd>
          <dt>
            <span id="monthOfDate">
              <Translate contentKey="extraMintyApp.budget.monthOfDate">Month Of Date</Translate>
            </span>
          </dt>
          <dd>{budgetEntity.monthOfDate}</dd>
          <dt>
            <span id="budgetYear">
              <Translate contentKey="extraMintyApp.budget.budgetYear">Budget Year</Translate>
            </span>
          </dt>
          <dd>{budgetEntity.budgetYear}</dd>
          <dt>
            <Translate contentKey="extraMintyApp.budget.user">User</Translate>
          </dt>
          <dd>{budgetEntity.user ? budgetEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/budget" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/budget/${budgetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BudgetDetail;
