import qs from 'qs';
import api from './api';

export const find = async filter => {
  const { data } = await api.get('usuarios', {
    params: {
      ...filter,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const page = {
    users: data.content,
    pageCount: data.totalPages,
  };

  return page;
};

export const store = user => {
  return api.post('usuarios', user);
};

export const update = user => {
  return api.put(`usuarios/${user.codigo}`, user);
};

export const remove = codigo => {
  return api.delete(`usuarios/${codigo}`);
};

export const updatePassword = data => {
  return api.put('perfil', data);
};
