import {
    SET_EDIT_USER_DATA,
} from './constants';

export function setEditUserData(e, { name, value }) {
    return {
        type: SET_EDIT_USER_DATA,
        data: { name, value }
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case SET_EDIT_USER_DATA:
            let newUser = Object.assign({}, state.userEdit, {[action.data.name]: action.data.value});
            return {
                ...state,
                userEdit: newUser
            };

        default:
            return state;
    }
}
