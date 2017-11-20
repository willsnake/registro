import {
  UsersList,
  AddUser,
} from './';

export default {
  path: 'registro',
  name: 'Registro',
  childRoutes: [
    { path: 'users-list', name: 'Users list', component: UsersList },
    { path: 'add-user', name: 'Add user', component: AddUser },
  ],
};
