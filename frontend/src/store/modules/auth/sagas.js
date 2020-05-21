import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

import api from '~/services/api';
import history from '~/services/history';
import {
  signInSuccess,
  signFailure,
  signOutSuccess,
} from '~/store/modules/auth/actions';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;

    api.defaults.headers.Authorization = 'Basic YW5ndWxhcjpAbmd1bEByMA==';
    api.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    const body = `username=${login}&password=${password}&grant_type=password`;

    const response = yield call(api.post, '/oauth/token', body, {
      withCredentials: true,
    });

    const { access_token, user_name, user_id, ug } = response.data;
    const { authorities } = jwt.decode(access_token);

    yield put(signInSuccess(access_token, user_name, user_id, ug, authorities));

    history.push('servidores');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signOut() {
  yield put(signOutSuccess());
  history.push('login');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
