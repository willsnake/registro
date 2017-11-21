import {
  UsersList,
  AddUser,
  UsersEdit,
} from './';

export default {
  path: 'registro',
  name: 'Registro',
  childRoutes: [
    { path: 'users-list', name: 'Users list', component: UsersList },
    { path: 'add-user', name: 'Add user', component: AddUser },
    { path: 'users-edit/:id', name: 'Users edit', component: UsersEdit },
  ],
};
