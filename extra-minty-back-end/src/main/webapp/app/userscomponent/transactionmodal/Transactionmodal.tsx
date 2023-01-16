import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidatedForm, ValidatedField, translate, Translate } from 'react-jhipster';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';
import { TransactionCategory } from 'app/shared/model/enumerations/transaction-category.model';
import { createEntity, updateEntity } from 'app/entities/profile/profile.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

const Transactionmodal = () => {

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
 
  const handleChange = (e) => {
    setCategory(e.target.value);
    setBudget(e.target.value);
  }

  const handleSave = () => {
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const budgets = useAppSelector(state => state.budget.entities);
  const bankAccounts = useAppSelector(state => state.bankAccount.entities);
  const transactionEntity = useAppSelector(state => state.transaction.entity);
  const loading = useAppSelector(state => state.transaction.loading);
  const updating = useAppSelector(state => state.transaction.updating);
  const updateSuccess = useAppSelector(state => state.transaction.updateSuccess);
  const transactionTypeValues = Object.keys(TransactionType);
  const transactionCategoryValues = Object.keys(TransactionCategory);

  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;
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

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

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
    <>
      <button onClick={handleShow}>
        Add transaction
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              {/* <ValidatedField
                label={translate('extraMintyApp.transaction.customCategoryName')}
                id="transaction-customCategoryName"
                name="customCategoryName"
                data-cy="customCategoryName"
                type="text"
              /> */}
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
                label={translate('extraMintyApp.transaction.customCategoryName')}
                id="transaction-customCategoryName"
                name="customCategoryName"
                data-cy="customCategoryName"
                type="text"
              />
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
                {bankAccounts
                  ? bankAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              {/* <Button id="cancel-save" data-cy="entityCreateCancelButton">
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
          {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Custom Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="category of transaction"
                autoFocus
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="type of transaction"
                autoFocus
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Transaction amount</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="no commas"
                value={budget} 
                required pattern="^\d+(\.\d{2})?$"
                onChange={(e) => setBudget(e.target.value)}
                />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" type="submit" onClick={handleSave}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Transactionmodal;