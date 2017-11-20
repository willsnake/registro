import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  REGISTRO_ADD_USER_BEGIN,
  REGISTRO_ADD_USER_SUCCESS,
  REGISTRO_ADD_USER_FAILURE,
  REGISTRO_ADD_USER_DISMISS_ERROR,
} from 'src/features/registro/redux/constants';

import {
  addUser,
  dismissAddUserError,
  reducer,
} from 'src/features/registro/redux/addUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('registro/redux/addUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REGISTRO_ADD_USER_BEGIN);
        expect(actions[1]).to.have.property('type', REGISTRO_ADD_USER_SUCCESS);
      });
  });

  it('dispatches failure action when addUser fails', () => {
    const store = mockStore({});

    return store.dispatch(addUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REGISTRO_ADD_USER_BEGIN);
        expect(actions[1]).to.have.property('type', REGISTRO_ADD_USER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissAddUserError', () => {
    const expectedAction = {
      type: REGISTRO_ADD_USER_DISMISS_ERROR,
    };
    expect(dismissAddUserError()).to.deep.equal(expectedAction);
  });

  it('handles action type REGISTRO_ADD_USER_BEGIN correctly', () => {
    const prevState = { addUserPending: false };
    const state = reducer(
      prevState,
      { type: REGISTRO_ADD_USER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addUserPending).to.be.true;
  });

  it('handles action type REGISTRO_ADD_USER_SUCCESS correctly', () => {
    const prevState = { addUserPending: true };
    const state = reducer(
      prevState,
      { type: REGISTRO_ADD_USER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addUserPending).to.be.false;
  });

  it('handles action type REGISTRO_ADD_USER_FAILURE correctly', () => {
    const prevState = { addUserPending: true };
    const state = reducer(
      prevState,
      { type: REGISTRO_ADD_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addUserPending).to.be.false;
    expect(state.addUserError).to.exist;
  });

  it('handles action type REGISTRO_ADD_USER_DISMISS_ERROR correctly', () => {
    const prevState = { addUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: REGISTRO_ADD_USER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addUserError).to.be.null;
  });
});
