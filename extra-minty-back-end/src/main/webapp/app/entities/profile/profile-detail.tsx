import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './profile.reducer';

export const ProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const profileEntity = useAppSelector(state => state.profile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="profileDetailsHeading">
          <Translate contentKey="extraMintyApp.profile.detail.title">Profile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{profileEntity.id}</dd>
          <dt>
            <span id="birthdate">
              <Translate contentKey="extraMintyApp.profile.birthdate">Birthdate</Translate>
            </span>
          </dt>
          <dd>
            {profileEntity.birthdate ? <TextFormat value={profileEntity.birthdate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="peppermintPoints">
              <Translate contentKey="extraMintyApp.profile.peppermintPoints">Peppermint Points</Translate>
            </span>
          </dt>
          <dd>{profileEntity.peppermintPoints}</dd>
          <dt>
            <span id="securityQuestion">
              <Translate contentKey="extraMintyApp.profile.securityQuestion">Security Question</Translate>
            </span>
          </dt>
          <dd>{profileEntity.securityQuestion}</dd>
          <dt>
            <span id="securityAnswer">
              <Translate contentKey="extraMintyApp.profile.securityAnswer">Security Answer</Translate>
            </span>
          </dt>
          <dd>{profileEntity.securityAnswer}</dd>
          <dt>
            <span id="profilePicture">
              <Translate contentKey="extraMintyApp.profile.profilePicture">Profile Picture</Translate>
            </span>
          </dt>
          <dd>
            {profileEntity.profilePicture ? (
              <div>
                {profileEntity.profilePictureContentType ? (
                  <a onClick={openFile(profileEntity.profilePictureContentType, profileEntity.profilePicture)}>
                    <img
                      src={`data:${profileEntity.profilePictureContentType};base64,${profileEntity.profilePicture}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {profileEntity.profilePictureContentType}, {byteSize(profileEntity.profilePicture)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="extraMintyApp.profile.user">User</Translate>
          </dt>
          <dd>{profileEntity.user ? profileEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profile/${profileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileDetail;
