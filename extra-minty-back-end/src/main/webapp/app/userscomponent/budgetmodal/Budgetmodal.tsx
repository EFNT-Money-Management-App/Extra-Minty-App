import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IBudget } from 'app/shared/model/budget.model';
import { Month } from 'app/shared/model/enumerations/month.model';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/profile/profile.reducer';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const Budgetmodal = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const budgetEntity = useAppSelector(state => state.budget.entity);
  const loading = useAppSelector(state => state.budget.loading);
  const updating = useAppSelector(state => state.budget.updating);
  const updateSuccess = useAppSelector(state => state.budget.updateSuccess);
  const monthValues = Object.keys(Month);

  const handleClose = () => {
    navigate('/budget');
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...budgetEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          monthOfDate: 'JANUARY',
          ...budgetEntity,
          user: budgetEntity?.user?.id,
        };

  return (
    <div>

      <Button variant="primary" onClick={handleShow}>
        Add budget
      </Button>

      <Modal show={show} onHide={handleClose}>

      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="extraMintyApp.budget.home.createOrEditLabel" data-cy="BudgetCreateUpdateHeading">
            <Translate contentKey="extraMintyApp.budget.home.createOrEditLabel">Create or edit a Budget</Translate>
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
                  id="budget-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('extraMintyApp.budget.spendingLimit')}
                id="budget-spendingLimit"
                name="spendingLimit"
                data-cy="spendingLimit"
                type="text"
              />
              <ValidatedField
                label={translate('extraMintyApp.budget.currentSpending')}
                id="budget-currentSpending"
                name="currentSpending"
                data-cy="currentSpending"
                type="text"
              />
              <ValidatedField label={translate('extraMintyApp.budget.name')} id="budget-name" name="name" data-cy="name" type="text" />
              <ValidatedField
                label={translate('extraMintyApp.budget.monthOfDate')}
                id="budget-monthOfDate"
                name="monthOfDate"
                data-cy="monthOfDate"
                type="select"
              >
                {monthValues.map(month => (
                  <option value={month} key={month}>
                    {translate('extraMintyApp.Month.' + month)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('extraMintyApp.budget.budgetYear')}
                id="budget-budgetYear"
                name="budgetYear"
                data-cy="budgetYear"
                type="text"
              />
              <ValidatedField id="budget-user" name="user" data-cy="user" label={translate('extraMintyApp.budget.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/budget" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
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

export default Budgetmodal;
