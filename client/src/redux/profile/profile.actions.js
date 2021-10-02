import {
    PROFILE_LOAD_DATA,
    PROFILE_ON_FROM_CHANGED,
    PROFILE_ON_FROM_VALIDATION,
    PROFILE_SET_IS_LOADING, PROFILE_SET_WAS_CHANGED
} from "../action.types";
import {httpRequest} from "../../services/utils/api/http.util";
import {API_PROFILE} from "../../services/utils/api/api.routes";
import {onProfileValidate} from "../../pages/ProfilePage/utils";
import {addToastMessage} from "../application/application.actions";

export const loadProfileDataActions = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(setProfileIsLoadingAction(true))
            const {token} = getState().auth
            const {data, status} = await httpRequest(
                API_PROFILE,
                'GET',
                null,
                {Authorization: `Bearer ${token}`}
            )
            if (status === 200) {
                dispatch({type: PROFILE_LOAD_DATA, payload: data})
            }
        } catch (e) {

        } finally {
            dispatch(setProfileIsLoadingAction(false))
        }
    }
}

export const onProfileChangedAction = (name, value) => {
    return dispatch => {
        dispatch({type: PROFILE_ON_FROM_CHANGED, payload: {name, value}})
        dispatch(setProfileWasChangedAction(true))
    }
}

export const onProfileSaveAction = () => {
    return async (dispatch, getState) => {
        try {
            const {
                firstName,
                lastName,
                additionalInfo,
            } = getState().profile

            const validationResult = onProfileValidate({firstName, lastName, additionalInfo})

            dispatch({type: PROFILE_ON_FROM_VALIDATION, payload: validationResult})

            if (validationResult.firstNameError || validationResult.lastNameError || validationResult.additionalInfoError) {
                return
            }

            dispatch(setProfileIsLoadingAction(true))
            const {token} = getState().auth
            const {status} = await httpRequest(
                API_PROFILE + '/update',
                'PUT',
                {firstName, lastName, additionalInfo},
                {Authorization: `Bearer ${token}`}
            )
            if(status === 201) {
                dispatch(setProfileWasChangedAction(false))
                dispatch(addToastMessage({
                    message: 'Saved', variant: 'success'
                }))
            }
        } catch (e) {

        } finally {
            dispatch(setProfileIsLoadingAction(false))
        }
    }
}

export const setProfileIsLoadingAction = flag => {
    return dispatch => {
        dispatch({type: PROFILE_SET_IS_LOADING, payload: flag})
    }
}

export const setProfileWasChangedAction = flag => {
    return dispatch => {
        dispatch({type: PROFILE_SET_WAS_CHANGED, payload: flag})
    }
}