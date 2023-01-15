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
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountType } from 'app/shared/model/enumerations/bank-account-type.model';
import { getEntity, updateEntity, createEntity, reset } from './bank-account.reducer';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { Modal } from 'react-bootstrap';

export const BankAccountUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const bankAccountEntity = useAppSelector(state => state.bankAccount.entity);
  const loading = useAppSelector(state => state.bankAccount.loading);
  const updating = useAppSelector(state => state.bankAccount.updating);
  const updateSuccess = useAppSelector(state => state.bankAccount.updateSuccess);
  const bankAccountTypeValues = Object.keys(BankAccountType);

  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const account = useAppSelector(state => state.authentication.account);

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

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bankAccountEntity,
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
          type: 'CHECKING',
          ...bankAccountEntity,
          user: bankAccountEntity?.user?.id,
        };

  return (
    <div>
      <Button style={{ background: '#00c314', border: '#00c314' }} onClick={handleShow}>
        Add Bank Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="extraMintyApp.bankAccount.home.createOrEditLabel" data-cy="BankAccountCreateUpdateHeading">
              <Translate contentKey="extraMintyApp.bankAccount.home.createOrEditLabel">Create or edit a BankAccount</Translate>
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
                    id="bank-account-id"
                    label={translate('global.field.id')}
                    validate={{ required: true }}
                  />
                ) : null}
                <ValidatedField
                  label={translate('extraMintyApp.bankAccount.balance')}
                  id="bank-account-balance"
                  name="balance"
                  data-cy="balance"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.bankAccount.accountNumber')}
                  id="bank-account-accountNumber"
                  name="accountNumber"
                  data-cy="accountNumber"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.bankAccount.routingNumber')}
                  id="bank-account-routingNumber"
                  name="routingNumber"
                  data-cy="routingNumber"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.bankAccount.bankName')}
                  id="bank-account-bankName"
                  name="bankName"
                  data-cy="bankName"
                  type="text"
                />
                <ValidatedField
                  label={translate('extraMintyApp.bankAccount.type')}
                  id="bank-account-type"
                  name="type"
                  data-cy="type"
                  type="select"
                >
                  {bankAccountTypeValues.map(bankAccountType => (
                    <option value={bankAccountType} key={bankAccountType}>
                      {translate('extraMintyApp.BankAccountType.' + bankAccountType)}
                    </option>
                  ))}
                </ValidatedField>
                <ValidatedField
                  id="bank-account-user"
                  name="user"
                  data-cy="user"
                  label={translate('extraMintyApp.bankAccount.user')}
                  type="select"
                >
                  {isAdmin ? <option value="" key="0" /> : <div>{account.login}</div>}
                  {isAdmin ? (
                    users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  ) : (
                    <option>{account.login}</option>
                  )}
                </ValidatedField>
                {/* <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bank-account" replace color="info">
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

export default BankAccountUpdate;
