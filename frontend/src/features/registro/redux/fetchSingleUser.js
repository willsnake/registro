import axios from 'axios';
import {
  SERVER_HOST,
  SERVER_PORT,
  REGISTRO_FETCH_SINGLE_USER_BEGIN,
  REGISTRO_FETCH_SINGLE_USER_SUCCESS,
  REGISTRO_FETCH_SINGLE_USER_FAILURE,
  REGISTRO_FETCH_SINGLE_USER_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchSingleUser(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REGISTRO_FETCH_SINGLE_USER_BEGIN,
    });

    return new Promise((resolve, reject) => {
      axios.get(`http://${SERVER_HOST}:${SERVER_PORT}/api/personas/${args.id}`).then(
        (res) => {
          dispatch({
            type: REGISTRO_FETCH_SINGLE_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: REGISTRO_FETCH_SINGLE_USER_FAILURE,
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
export function dismissFetchUsersError() {
  return {
    type: REGISTRO_FETCH_SINGLE_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REGISTRO_FETCH_SINGLE_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchUsersPending: true,
        fetchUsersError: null,
      };

    case REGISTRO_FETCH_SINGLE_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchUsersPending: false,
        fetchUsersError: null,
        userEdit: action.data,
        usersEditShowLoader: false,
      };

    case REGISTRO_FETCH_SINGLE_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchUsersPending: false,
        fetchUsersError: action.data.error,
        usersEditShowLoader: false,
      };

    case REGISTRO_FETCH_SINGLE_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchUsersError: null,
      };

    default:
      return state;
  }
}
