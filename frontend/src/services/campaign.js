import api from './api';

export const get = () => {
  return api.get('campanhas');
};

export const update = campaign => {
  return api.put(`campanhas/${campaign.codigo}`, campaign);
};
