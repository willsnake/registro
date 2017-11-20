import {
    SET_USER_DATA,
} from './constants';

export function setUserData(e, { name, value }) {
    return {
        type: SET_USER_DATA,
        data: { name, value }
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case SET_USER_DATA:
            let newUser = Object.assign({}, state.user, {[action.data.name]: action.data.value});
            return {
                ...state,
                user: newUser
            };

        default:
            return state;
    }
}
