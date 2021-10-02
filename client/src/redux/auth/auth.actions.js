import {
    AUTH_CLEAR_AUTH,
    AUTH_SET_AUTH,
    AUTH_SET_IS_LOADING,
    AUTH_SET_IS_READY,
    PROFILE_ON_FROM_CHANGED
} from "../action.types";
import {LS_EMAIL, LS_TOKEN, LS_USERID, LS_USERNAME} from "../../services/types/localStorage";
import {httpRequest} from "../../services/utils/api/http.util";
import {API_AUTH} from "../../services/utils/api/api.routes";
import {
    addToastMessage,
    setAuthStepAction,
    setIsAuthModalVisibleAction,
    setIsServerAvailable
} from "../application/application.actions";
import {STEP_LOGIN} from "../../modals/AuthModal/types";

const setAuthAction = ({userId, token, email, username, role}) => {
    return dispatch => {
        localStorage.setItem(LS_USERID, userId)
        localStorage.setItem(LS_EMAIL, email)
        localStorage.setItem(LS_USERNAME, username)
        localStorage.setItem(LS_TOKEN, token)
        dispatch({type: AUTH_SET_AUTH, payload: {userId, token, email, username, role}})
    }
}

const setAuthIsReadyAction = flag => {
    return dispatch => {
        dispatch({type: AUTH_SET_IS_READY, payload: flag})
    }
}

export const checkAuthAction = () => {
    return async dispatch => {

        dispatch(setAuthIsLoading(true))
        const token = localStorage.getItem(LS_TOKEN)
        try {
            const {data, status} = await httpRequest(
                API_AUTH + '/check',
                'POST',
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            if(status === 201) {
                const userId = localStorage.getItem(LS_USERID)
                const email = localStorage.getItem(LS_EMAIL)
                const username = localStorage.getItem(LS_USERNAME)
                dispatch(setIsAuthModalVisibleAction(false))
                dispatch(setAuthAction({userId, token, email, username, role: data.role}))
            } else if (status === 401) {
                localStorage.clear()
            }
        } catch (e) {
            dispatch(setIsServerAvailable(false))
        } finally {
            dispatch(setAuthIsLoading(false))
            dispatch(setAuthIsReadyAction(true))
        }
    }
}

export const setAuthIsLoading = (flag) => {
    return dispatch => {
        dispatch({type: AUTH_SET_IS_LOADING, payload: flag})
    }
}

export const createAccountAction = ({email, password, username}) => {
    return async dispatch => {
        if (!email || !password || !username) {
            return
        }
        dispatch(setAuthIsLoading(true))
        try {
            const {status} = await httpRequest(API_AUTH + '/register', 'POST', {email, password, username})
            if(status === 201) {
                dispatch(setAuthStepAction(STEP_LOGIN))
                dispatch(addToastMessage({
                    message: 'Registration success', variant: 'success'
                }))
            }
        } catch (e) {

        } finally {
            dispatch(setAuthIsLoading(false))
        }
    }
}

export const loginAction = ({email, password}) => {
    return async dispatch => {
        dispatch(setAuthIsLoading(true))

        try {
            const {data, status} = await httpRequest(API_AUTH + '/login', 'POST', {email, password})
            if(status === 201) {
                dispatch(setAuthAction({...data}))
                dispatch(setIsAuthModalVisibleAction(false))
            }
        } catch (e) {

        } finally {
            dispatch(setAuthIsLoading(false))
        }
    }
}

export const clearAuthAction = () => {
    return dispatch => {
        localStorage.clear()
        dispatch({type: AUTH_CLEAR_AUTH, payload: null})
        dispatch({type: PROFILE_ON_FROM_CHANGED, payload: {name: 'firstName', value: ''}})
        dispatch({type: PROFILE_ON_FROM_CHANGED, payload: {name: 'lastName', value: ''}})
        dispatch({type: PROFILE_ON_FROM_CHANGED, payload: {name: 'additionalInfo', value: ''}})
    }
}