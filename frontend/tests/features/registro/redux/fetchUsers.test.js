import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  REGISTRO_FETCH_USERS_BEGIN,
  REGISTRO_FETCH_USERS_SUCCESS,
  REGISTRO_FETCH_USERS_FAILURE,
  REGISTRO_FETCH_USERS_DISMISS_ERROR,
} from 'src/features/registro/redux/constants';

import {
  fetchUsers,
  dismissFetchUsersError,
  reducer,
} from 'src/features/registro/redux/fetchUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('registro/redux/fetchUsers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchUsers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchUsers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REGISTRO_FETCH_USERS_BEGIN);
        expect(actions[1]).to.have.property('type', REGISTRO_FETCH_USERS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchUsers fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchUsers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REGISTRO_FETCH_USERS_BEGIN);
        expect(actions[1]).to.have.property('type', REGISTRO_FETCH_USERS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchUsersError', () => {
    const expectedAction = {
      type: REGISTRO_FETCH_USERS_DISMISS_ERROR,
    };
    expect(dismissFetchUsersError()).to.deep.equal(expectedAction);
  });

  it('handles action type REGISTRO_FETCH_USERS_BEGIN correctly', () => {
    const prevState = { fetchUsersPending: false };
    const state = reducer(
      prevState,
      { type: REGISTRO_FETCH_USERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersPending).to.be.true;
  });

  it('handles action type REGISTRO_FETCH_USERS_SUCCESS correctly', () => {
    const prevState = { fetchUsersPending: true };
    const state = reducer(
      prevState,
      { type: REGISTRO_FETCH_USERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersPending).to.be.false;
  });

  it('handles action type REGISTRO_FETCH_USERS_FAILURE correctly', () => {
    const prevState = { fetchUsersPending: true };
    const state = reducer(
      prevState,
      { type: REGISTRO_FETCH_USERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersPending).to.be.false;
    expect(state.fetchUsersError).to.exist;
  });

  it('handles action type REGISTRO_FETCH_USERS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchUsersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: REGISTRO_FETCH_USERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersError).to.be.null;
  });
});
