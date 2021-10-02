import {
    APPLICATION_ADD_TOAST_MESSAGE,
    APPLICATION_SET_AUTH_STEP,
    APPLICATION_SET_IS_AUTH_MODAL_VISIBLE, APPLICATION_SET_IS_SERVER_AVAILABLE
} from "../action.types";

export const setIsAuthModalVisibleAction = flag => {
    return dispatch => {
        dispatch({type: APPLICATION_SET_IS_AUTH_MODAL_VISIBLE, payload: flag})
    }
}

export const setAuthStepAction = step => {
    return dispatch => {
        dispatch({type: APPLICATION_SET_AUTH_STEP, payload: step})
    }
}

export const addToastMessage = message => {
    return dispatch => {
        dispatch({type: APPLICATION_ADD_TOAST_MESSAGE, payload: message})
    }
}

export const setIsServerAvailable = flag => {
    return dispatch => {
        dispatch({type: APPLICATION_SET_IS_SERVER_AVAILABLE, payload: flag})
    }
}

