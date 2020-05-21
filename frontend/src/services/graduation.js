import qs from 'qs';
import axios from 'axios';
import api from './api';

export const list = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/formacoes?list`);
};

export const find = async filter => {
  const { data } = await api.get('formacoes', {
    params: {
      ...filter,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const page = {
    graduations: data.content,
    pageCount: data.totalPages,
  };

  return page;
};

export const store = graduation => {
  return api.post('formacoes', graduation);
};

export const update = graduation => {
  return api.put(`formacoes/${graduation.codigo}`, graduation);
};

export const remove = codigo => {
  return api.delete(`formacoes/${codigo}`);
};
