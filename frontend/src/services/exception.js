import { toast } from 'react-toastify';

export function handle(error) {
  let msg = 'Não foi possível processar sua solicitação. Tente novamente';

  try {
    if (error) {
      if (error.status === 401) {
        return Promise.reject(error);
      }

      if (error.status === 400) {
        msg = error.data[0].message;
      }
    }
  } catch (e) { return Promise.reject(error); } //eslint-disable-line

  toast.error(msg);

  return Promise.reject(error);
}
