import {
    AUTH_CLEAR,
    AUTH_SET_AUTH,
    AUTH_SET_IS_LOADING,
    AUTH_SET_IS_READY,
} from "../action.types";

const initialState = {
    userId: '',
    token: '',
    email: '',
    username: '',
    role: '',

    isReady: false,
    isLoading: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_AUTH:
            return {...state, ...action.payload}
        case AUTH_SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case AUTH_SET_IS_READY:
            return {...state, isReady: action.payload}
        case AUTH_CLEAR:
            return {initialState, isReady: true}
        default:
            return state
    }
}
