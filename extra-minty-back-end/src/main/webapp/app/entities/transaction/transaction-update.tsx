import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBudget } from 'app/shared/model/budget.model';
import { getEntities as getBudgets } from 'app/entities/budget/budget.reducer';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { getEntities as getBankAccounts } from 'app/entities/bank-account/bank-account.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';
import { TransactionCategory } from 'app/shared/model/enumerations/transaction-category.model';
import { getEntity, updateEntity, createEntity, reset } from './transaction.reducer';

import { Modal } from 'react-bootstrap';

export const TransactionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const budgets = useAppSelector(state => state.budget.entities);
  const bankAccounts = useAppSelector(state => state.bankAccount.entities);
  const transactionEntity = useAppSelector(state => state.transaction.entity);
  const loading = useAppSelector(state => state.transaction.loading);
  const updating = useAppSelector(state => state.transaction.updating);
  const updateSuccess = useAppSelector(state => state.transaction.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);

  const transactionTypeValues = Object.keys(TransactionType);
  const transactionCategoryValues = Object.keys(TransactionCategory);

  const handleClose = () => {
    navigate('/useraccount');
    window.location.reload();
    setShow(false);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBudgets({}));
    dispatch(getBankAccounts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...transactionEntity,
      ...values,
      budget: budgets.find(it => it.id.toString() === values.budget.toString()),
      bankAccount: bankAccounts.find(it => it.id.toString() === values.bankAccount.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          type: 'DEPOSIT',
          category: 'BILL',
          ...transactionEntity,
          date: convertDateTimeFromServer(transactionEntity.date),
          budget: transactionEntity?.budget?.id,
          bankAccount: transactionEntity?.bankAccount?.id,
        };

  return (
    <div>
      <Button style={{ background: '#00c314', border: '#00c314'}}onClick={handleShow}>Add Transaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="extraMintyApp.transaction.home.createOrEditLabel" data-cy="TransactionCreateUpdateHeading">
              <Translate contentKey="extraMintyApp.transaction.home.createOrEditLabel">Create or edit a Transaction</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                {!isNew ? (
                  <ValidatedField
                    name="id"
                    required
                    readOnly
                    id="transaction-id"
                    label={translate('global.field.id')}
                    validate={{ required: true }}
                  />
                ) : null}
                <ValidatedField
                  label={translate('extraMintyApp.transaction.customCategoryName')}
                  id="transaction-customCategoryName"
                  name="customCategoryName"
                  data-cy="customCategoryName"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.transaction.type')}
                  id="transaction-type"
                  name="type"
                  data-cy="type"
                  type="select"
                >
                  {transactionTypeValues.map(transactionType => (
                    <option value={transactionType} key={transactionType}>
                      {translate('extraMintyApp.TransactionType.' + transactionType)}
                    </option>
                  ))}
                </ValidatedField>
                <ValidatedField
                  label={translate('extraMintyApp.transaction.amount')}
                  id="transaction-amount"
                  name="amount"
                  data-cy="amount"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.transaction.category')}
                  id="transaction-category"
                  name="category"
                  data-cy="category"
                  type="select"
                >
                  {transactionCategoryValues.map(transactionCategory => (
                    <option value={transactionCategory} key={transactionCategory}>
                      {translate('extraMintyApp.TransactionCategory.' + transactionCategory)}
                    </option>
                  ))}
                </ValidatedField>
                <ValidatedField
                  label={translate('extraMintyApp.transaction.date')}
                  id="transaction-date"
                  name="date"
                  data-cy="date"
                  type="datetime-local"
                  placeholder="YYYY-MM-DD HH:mm"
                />
                <ValidatedField
                  label={translate('extraMintyApp.transaction.description')}
                  id="transaction-description"
                  name="description"
                  data-cy="description"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.transaction.transferToAccountNumber')}
                  id="transaction-transferToAccountNumber"
                  name="transferToAccountNumber"
                  data-cy="transferToAccountNumber"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.transaction.transferFromAccountNumber')}
                  id="transaction-transferFromAccountNumber"
                  name="transferFromAccountNumber"
                  data-cy="transferFromAccountNumber"
                  type="text"
                />
                <ValidatedField
                  id="transaction-budget"
                  name="budget"
                  data-cy="budget"
                  label={translate('extraMintyApp.transaction.budget')}
                  type="select"
                >
                  <option value="" key="0" />
                  {budgets
                    ? budgets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </ValidatedField>
                <ValidatedField
                  id="transaction-bankAccount"
                  name="bankAccount"
                  data-cy="bankAccount"
                  label={translate('extraMintyApp.transaction.bankAccount')}
                  type="select"
                >
                  <option value="" key="0" />
                  {bankAccounts ? (
                    bankAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  ) : (
                    <option>{account.login}</option>
                  )}
                </ValidatedField>
                {/* <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/transaction" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button> */}
                &nbsp;
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </ValidatedForm>
            )}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TransactionUpdate;
