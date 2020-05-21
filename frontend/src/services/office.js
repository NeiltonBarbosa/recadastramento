import qs from 'qs';
import axios from 'axios';
import api from './api';

export const list = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cargos?list`);
};

export const find = async filter => {
  const { data } = await api.get('cargos', {
    params: {
      ...filter,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const page = {
    offices: data.content,
    pageCount: data.totalPages,
  };

  return page;
};

export const store = office => {
  return api.post('cargos', office);
};

export const update = office => {
  return api.put(`cargos/${office.codigo}`, office);
};

export const remove = codigo => {
  return api.delete(`cargos/${codigo}`);
};
