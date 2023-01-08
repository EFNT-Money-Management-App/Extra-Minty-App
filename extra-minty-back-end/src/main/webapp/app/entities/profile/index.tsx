import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Profile from './profile';
import ProfileDetail from './profile-detail';
import ProfileUpdate from './profile-update';
import ProfileDeleteDialog from './profile-delete-dialog';

const ProfileRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Profile />} />
    <Route path="new" element={<ProfileUpdate />} />
    <Route path=":id">
      <Route index element={<ProfileDetail />} />
      <Route path="edit" element={<ProfileUpdate />} />
      <Route path="delete" element={<ProfileDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProfileRoutes;
