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
import { getEntity, updateEntity, createEntity, reset } from './budget.reducer';

import { Modal } from 'react-bootstrap';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import axios from 'axios';

export const BudgetUpdate = (props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  // const { id } = props;
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const budgetEntity = useAppSelector(state => state.budget.entity);
  const loading = useAppSelector(state => state.budget.loading);
  const updating = useAppSelector(state => state.budget.updating);
  const updateSuccess = useAppSelector(state => state.budget.updateSuccess);
  const monthValues = Object.keys(Month);

  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const account = useAppSelector(state => state.authentication.account);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [userList, setUserList] = useState<IUser>();

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/account')
      .then(response => {
        console.log(response.data);
        setUserList(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClose = () => {
    navigate('/userbudget')
    window.location.reload();
    setShow(false);
  };

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
      // user: users.find(it => it.id.toString() === values.user.toString()),
      user: users.find(it => it.login === account.login),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    };

    handleClose();
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
      <Button style={{ background: '#00c314', border: '#00c314' }} onClick={handleShow}>
        {isNew ? 'Add Budget' : 'Update Budget'}
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
                {/* <ValidatedField id="budget-user" name="user" data-cy="user" label={translate('extraMintyApp.budget.user')} type="select"> */}
                  {/* {isAdmin ? <option value="" key="0" /> : <div>{account.login}</div>}
                  {users ? (
                    users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  ) : (null)}; */}
                    {/* <option>
                      {userList.login}
                    </option> */}
                    {/* {userList.map(userEntity => ( */}
                      {/* <option>
                        {userList.id}
                      </option> */}
                    {/* ))} */}
                  {/* )} */}
                {/* </ValidatedField> */}
                {/* <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/userbudget" replace color="info">
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.cancel">Cancel</Translate>
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

export default BudgetUpdate;
