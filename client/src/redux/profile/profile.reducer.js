import {
    PROFILE_CLEAR,
    PROFILE_LOAD_DATA,
    PROFILE_ON_FROM_CHANGED,
    PROFILE_ON_FROM_VALIDATION,
    PROFILE_SET_IS_LOADING, PROFILE_SET_WAS_CHANGED
} from "../action.types";

const initialState = {
    firstName: '',
    lastName: '',
    additionalInfo: '',

    firstNameError: '',
    lastNameError: '',
    additionalInfoError: '',

    wasChanged: false,
    isLoading: false,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOAD_DATA:
            return {...state, ...action.payload}
        case PROFILE_ON_FROM_CHANGED:
            return {...state, [action.payload.name]: action.payload.value}
        case PROFILE_ON_FROM_VALIDATION:
            return {...state, ...action.payload}
        case PROFILE_SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case PROFILE_SET_WAS_CHANGED:
            return {...state, wasChanged: action.payload}
        case PROFILE_CLEAR:
            return initialState
        default:
            return state
    }
}
