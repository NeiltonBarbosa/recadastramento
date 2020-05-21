import { store } from '~/store';

const hasRole = role => {
  const { profile } = store.getState().user;
  const { roles } = profile;
  return roles && roles.includes(role);
};

const hasAnyRole = roles => {
  return roles.some(role => {
    return hasRole(role);
  });
};

export { hasRole, hasAnyRole };
