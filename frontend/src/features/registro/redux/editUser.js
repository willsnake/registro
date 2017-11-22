import axios from 'axios';
import {
  SERVER_HOST,
  SERVER_PORT,
  REGISTRO_EDIT_USER_BEGIN,
  REGISTRO_EDIT_USER_SUCCESS,
  REGISTRO_EDIT_USER_FAILURE,
  REGISTRO_EDIT_USER_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function editUser(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: REGISTRO_EDIT_USER_BEGIN
    });

    const { userEdit } = getState().registro;

    return new Promise((resolve, reject) => {
      axios.put(`http://${SERVER_HOST}:${SERVER_PORT}/api/personas/${userEdit.id}`, userEdit).then(
        (res) => {
          dispatch({
            type: REGISTRO_EDIT_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: REGISTRO_EDIT_USER_FAILURE,
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
    type: REGISTRO_EDIT_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REGISTRO_EDIT_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        editUserPending: true,
        editUserError: null,
        loadingUserEditForm: true,
        editUserSuccessMessage: false,
        editUserErrorMessage: false
      };

    case REGISTRO_EDIT_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        editUserPending: false,
        editUserError: null,
        loadingUserEditForm: false,
        editUserSuccessMessage: true
      };

    case REGISTRO_EDIT_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        editUserPending: false,
        editUserError: action.data.error,
        loadingUserEditForm: false,
        editUserErrorMessage: true
      };

    case REGISTRO_EDIT_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        editUserError: null,
      };

    default:
      return state;
  }
}
