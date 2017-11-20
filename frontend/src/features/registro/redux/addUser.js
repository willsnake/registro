import axios from 'axios';
import {
  REGISTRO_ADD_USER_BEGIN,
  REGISTRO_ADD_USER_SUCCESS,
  REGISTRO_ADD_USER_FAILURE,
  REGISTRO_ADD_USER_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addUser(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: REGISTRO_ADD_USER_BEGIN
    });

    const { user } = getState().registro;

    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/personas', user).then(
        (res) => {
          dispatch({
            type: REGISTRO_ADD_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: REGISTRO_ADD_USER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddUserError() {
  return {
    type: REGISTRO_ADD_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REGISTRO_ADD_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addUserPending: true,
        addUserError: null,
        loadingUserAddForm: true,
        addUserSuccessMessage: false,
        addUserErrorMessage: false
      };

    case REGISTRO_ADD_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        addUserPending: false,
        addUserError: null,
        loadingUserAddForm: false,
        addUserSuccessMessage: true
      };

    case REGISTRO_ADD_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        addUserPending: false,
        addUserError: action.data.error,
        loadingUserAddForm: false,
        addUserErrorMessage: true
      };

    case REGISTRO_ADD_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addUserError: null,
      };

    default:
      return state;
  }
}
