import {
    RECORDS_GET_RECORDS,
    RECORDS_ADD_RECORD,
    RECORDS_ON_RECORD_CHANGED,
    RECORDS_SET_MANAGE_RECORD_LOADING,
    RECORDS_SET_GET_RECORDS_LOADING,
    RECORDS_EDIT_RECORD,
    RECORDS_DELETE_RECORD, RECORDS_SET_IS_LOADED, RECORDS_CLEAR
} from "../action.types";

const initialState = {
    record: '',
    isManageRecordsLoading: false,
    records: [],
    isGetRecordsLoading: false,
    isLoaded: false,
}

export const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECORDS_SET_MANAGE_RECORD_LOADING:
            return {...state, isManageRecordsLoading: action.payload}
        case RECORDS_SET_GET_RECORDS_LOADING:
            return {...state, isGetRecordsLoading: action.payload}
        case RECORDS_ON_RECORD_CHANGED:
            return {...state, record: action.payload}
        case RECORDS_GET_RECORDS:
            return {...state, records: action.payload}
        case RECORDS_ADD_RECORD:
            return {...state, records: [...state.records, action.payload]}
        case RECORDS_DELETE_RECORD:
            const deleteCopy = state.records.filter(item => item.id !== action.payload.id)
            return {...state, records: deleteCopy}
        case RECORDS_EDIT_RECORD:
            const editCopy = state.records.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
            return {...state, records: editCopy}
        case RECORDS_SET_IS_LOADED:
            return {...state, isLoaded: action.payload}
        case RECORDS_CLEAR:
            return initialState
        default:
            return state
    }
}
