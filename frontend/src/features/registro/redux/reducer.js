import initialState from './initialState';
import { reducer as fetchUsersReducer } from './fetchUsers';
import { reducer as addUserReducer } from './addUser';
import { reducer as editUser } from './editUser';
import { reducer as setUserData } from './setUserData';
import { reducer as printID } from './printID';
import { reducer as printIDEdit } from './printIDEdit';
import { reducer as fetchSingleUser } from './fetchSingleUser';
import { reducer as setEditUserData } from './setEditUserData';
import { reducer as printDiploma } from './printDiploma';

const reducers = [
  fetchUsersReducer,
  addUserReducer,
  setUserData,
  printID,
  printIDEdit,
  fetchSingleUser,
  setEditUserData,
  editUser,
  printDiploma,
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
