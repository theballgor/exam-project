import {
    APPLICATION_ADD_TOAST_MESSAGE,
    APPLICATION_SET_AUTH_STEP,
    APPLICATION_SET_IS_AUTH_MODAL_VISIBLE,
    APPLICATION_SET_IS_SERVER_AVAILABLE,
} from "../action.types";
import {STEP_LOGIN} from "../../modals/AuthModal/types";

const initialState = {
    isAuthModalVisible: false,

    toastMessages: [],

    currentAuthStep: STEP_LOGIN,

    isServerAvailable: true,
}

export const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_SET_IS_AUTH_MODAL_VISIBLE:
            return {...state, isAuthModalVisible: action.payload}
        case APPLICATION_SET_AUTH_STEP:
            return {...state, currentAuthStep: action.payload}
        case APPLICATION_ADD_TOAST_MESSAGE:
            return {...state, toastMessages: [...state.toastMessages, action.payload]}
        case APPLICATION_SET_IS_SERVER_AVAILABLE:
            return {...state, isServerAvailable: action.payload}
        default:
            return state
    }
}
