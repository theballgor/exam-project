import {
    ADMIN_CLEAR,
    ADMIN_DELETE_USER,
    ADMIN_GET_USERS,
    ADMIN_GET_USERS_LOADING,
    ADMIN_SET_TOTAL_COUNT
} from "../action.types";

const initialState = {
    users: [],
    isGetUsersLoading: false,
    totalCount: 0,
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.payload.users]
            }
        case ADMIN_SET_TOTAL_COUNT:
            return {...state, totalCount: action.payload || state.totalCount || 0}
        case ADMIN_GET_USERS_LOADING:
            return {...state, isGetUsersLoading: action.payload}
        case ADMIN_DELETE_USER:
            const deleteCopy = state.users.filter(item => item.id !== action.payload.id)
            return {...state, users: deleteCopy}
        case ADMIN_CLEAR:
            return initialState
        default:
            return state
    }
}
