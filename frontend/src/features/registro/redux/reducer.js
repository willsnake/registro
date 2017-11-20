import initialState from './initialState';
import { reducer as fetchUsersReducer } from './fetchUsers';
import { reducer as addUserReducer } from './addUser';
import { reducer as setUserData } from './setUserData';
import { reducer as printID } from './printID';

const reducers = [
  fetchUsersReducer,
  addUserReducer,
  setUserData,
  printID,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
