import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { hasAnyRole } from '~/services/security';
import { store } from '~/store';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import AdminLayout from '~/pages/_layouts/admin';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  roles,
  ...rest
}) {
  const { path } = rest;
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (roles) {
    if (!hasAnyRole(roles)) {
      return <Redirect to="/403" />;
    }
  }

  /*
  if (signed && !isPrivate) {
    return <Redirect to="/servidores" />;
  } */

  let Layout = DefaultLayout;

  if (isPrivate) {
    Layout = AdminLayout;
  } else if (path === '/login') {
    Layout = AuthLayout;
  } else {
    Layout = DefaultLayout;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  roles: null,
};
