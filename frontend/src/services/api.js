import axios from 'axios';

import { store } from '~/store';

import { signOutRequest } from '~/store/modules/auth/actions';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(config => {
  const { url } = config;

  if (url !== '/oauth/token') {
    const { access_token } = store.getState().auth;
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;

    if (status === 401) {
      store.dispatch(signOutRequest());
    }

    return Promise.reject(error.response);
  }
);

export default api;
