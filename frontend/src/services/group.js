import api from './api';

export const list = () => {
  return api.get('grupos?list');
};
