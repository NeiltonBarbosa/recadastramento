import produce from 'immer';

const INITIAL_STATE = {
  profile: {},
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = {
          codigo: action.payload.user_id,
          user_name: action.payload.user_name,
          ug: action.payload.ug,
          roles: action.payload.authorities,
        };
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.profile = {};
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = {};
        break;
      }
      default:
    }
  });
}
