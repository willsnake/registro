import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  REGISTRO_SEARCH_USER_BEGIN,
  REGISTRO_SEARCH_USER_SUCCESS,
  REGISTRO_SEARCH_USER_FAILURE,
  REGISTRO_SEARCH_USER_DISMISS_ERROR,
} from 'src/features/registro/redux/constants';

import {
  searchUser,
  dismissSearchUserError,
  reducer,
} from 'src/features/registro/redux/searchUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('registro/redux/searchUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REGISTRO_SEARCH_USER_BEGIN);
        expect(actions[1]).to.have.property('type', REGISTRO_SEARCH_USER_SUCCESS);
      });
  });

  it('dispatches failure action when searchUser fails', () => {
    const store = mockStore({});

    return store.dispatch(searchUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REGISTRO_SEARCH_USER_BEGIN);
        expect(actions[1]).to.have.property('type', REGISTRO_SEARCH_USER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSearchUserError', () => {
    const expectedAction = {
      type: REGISTRO_SEARCH_USER_DISMISS_ERROR,
    };
    expect(dismissSearchUserError()).to.deep.equal(expectedAction);
  });

  it('handles action type REGISTRO_SEARCH_USER_BEGIN correctly', () => {
    const prevState = { searchUserPending: false };
    const state = reducer(
      prevState,
      { type: REGISTRO_SEARCH_USER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.searchUserPending).to.be.true;
  });

  it('handles action type REGISTRO_SEARCH_USER_SUCCESS correctly', () => {
    const prevState = { searchUserPending: true };
    const state = reducer(
      prevState,
      { type: REGISTRO_SEARCH_USER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.searchUserPending).to.be.false;
  });

  it('handles action type REGISTRO_SEARCH_USER_FAILURE correctly', () => {
    const prevState = { searchUserPending: true };
    const state = reducer(
      prevState,
      { type: REGISTRO_SEARCH_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.searchUserPending).to.be.false;
    expect(state.searchUserError).to.exist;
  });

  it('handles action type REGISTRO_SEARCH_USER_DISMISS_ERROR correctly', () => {
    const prevState = { searchUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: REGISTRO_SEARCH_USER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.searchUserError).to.be.null;
  });
});
