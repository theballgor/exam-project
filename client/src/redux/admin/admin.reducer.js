import {ADMIN_GET_USERS, ADMIN_GET_USERS_LOADING} from "../action.types";

const initialState = {
    users: [],
    isGetUsersLoading: false,
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS:
            return {...state, users: [...state.users, action.payload]}
        case ADMIN_GET_USERS_LOADING:
            return {...state, isGetUsersLoading: action.payload}
        default:
            return state
    }
}
