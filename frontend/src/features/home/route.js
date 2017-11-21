import {
  TestPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'test-page', name: 'Test page', component: TestPage },
  ],
};
