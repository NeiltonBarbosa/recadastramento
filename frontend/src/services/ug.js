import qs from 'qs';
import axios from 'axios';
import api from './api';

export const find = async filter => {
  const { data } = await api.get('unidades_gestoras', {
    params: {
      ...filter,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const page = {
    ugs: data.content,
    pageCount: data.totalPages,
  };

  return page;
};

export const list = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/unidades_gestoras?list`);
};

export const store = ug => {
  return api.post('unidades_gestoras', ug);
};

export const update = ug => {
  return api.put(`unidades_gestoras/${ug.codigo}`, ug);
};

export const remove = codigo => {
  return api.delete(`unidades_gestoras/${codigo}`);
};
