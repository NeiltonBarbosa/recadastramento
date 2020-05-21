import qs from 'qs';
import axios from 'axios';
import api from './api';

export const find = async filter => {
  const { data } = await api.get('servidores', {
    params: {
      ...filter,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const page = {
    servidores: data.content,
    pageCount: data.totalPages,
  };

  return page;
};

export const findByCpf = cpf => {
  return axios.get(`${process.env.REACT_APP_API_URL}/servidores/${cpf}`);
};

export const store = servidor => {
  return api.post('servidores', servidor);
};

export const update = servidor => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/servidores_atualizados`,
    servidor
  );
};

export const remove = codigo => {
  return api.delete(`servidores/${codigo}`);
};

export const create = () => {};
