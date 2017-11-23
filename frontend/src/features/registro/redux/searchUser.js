import axios from 'axios';
import {
  SERVER_HOST,
  SERVER_PORT,
  REGISTRO_SEARCH_USER_BEGIN,
  REGISTRO_SEARCH_USER_SUCCESS,
  REGISTRO_SEARCH_USER_FAILURE,
  REGISTRO_SEARCH_USER_DISMISS_ERROR,
  REGISTRO_SEARCH_INITIAL_STATE,
} from './constants';

import { fetchUsers } from './fetchUsers';

export function searchUser(e, args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if (args.value.length > 2) {
      dispatch({
        type: REGISTRO_SEARCH_USER_BEGIN,
        text: args.value
      });

      return new Promise((resolve, reject) => {
        let query = `http://${SERVER_HOST}:${SERVER_PORT}/api/personas?`;
        query += `filter={"where":{"or":[{"nombre":{"like":"${args.value}","options":"i"}},`;
        query += `{"apellido_pa":{"like":"${args.value}","options":"i"}},`;
        query += `{"apellido_ma":{"like":"${args.value}","options":"i"}}]}}`;
        axios.get(query).then(
          (res) => {
            dispatch({
              type: REGISTRO_SEARCH_USER_SUCCESS,
              data: res.data,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: REGISTRO_SEARCH_USER_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
      });
    }

    dispatch({
      type: REGISTRO_SEARCH_INITIAL_STATE
    });

    fetchUsers()(dispatch);

    return {};
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchUserError() {
  return {
    type: REGISTRO_SEARCH_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REGISTRO_SEARCH_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        searchUserPending: true,
        searchUserError: null,
        searchUsersLoader: true
      };

    case REGISTRO_SEARCH_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        searchUserPending: false,
        searchUserError: null,
        searchUsersLoader: false,
        users: action.data
      };

    case REGISTRO_SEARCH_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        searchUserPending: false,
        searchUserError: action.data.error,
        searchUsersLoader: false
      };

    case REGISTRO_SEARCH_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        searchUserError: null,
      };

    case REGISTRO_SEARCH_INITIAL_STATE:
      // Dismiss the request failure error
      return {
        ...state,
        searchUserError: null,
        searchUsersLoader: false
      };

    default:
      return state;
  }
}
