import {
    RECORDS_ADD_RECORD, RECORDS_DELETE_RECORD, RECORDS_EDIT_RECORD,
    RECORDS_GET_RECORDS,
    RECORDS_ON_RECORD_CHANGED,
    RECORDS_SET_GET_RECORDS_LOADING, RECORDS_SET_IS_LOADED,
    RECORDS_SET_MANAGE_RECORD_LOADING
} from "../action.types";
import {httpRequest} from "../../services/utils/api/http.util";
import {API_RECORDS} from "../../services/utils/api/api.routes";
import {addToastMessage} from "../application/application.actions";

export const setRecordsManageRecordsLoadingAction = flag => {
    return dispatch => {
        dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: flag})
    }
}

export const setRecordsGetRecordsLoadingAction = flag => {
    return dispatch => {
        dispatch({type: RECORDS_SET_GET_RECORDS_LOADING, payload: flag})
    }
}

export const onRecordsRecordChangedAction = value => {
    return dispatch => {
        dispatch({type: RECORDS_ON_RECORD_CHANGED, payload: value})
    }
}

export const setRecordsIsLoadedAction = flag => {
    return dispatch => {
        dispatch({type: RECORDS_SET_IS_LOADED, payload: flag})
    }
}

export const getRecordsRecordsAction = () => {
    return async (dispatch, getState) => {

        try {
            const {token} = getState().auth

            dispatch({type: RECORDS_SET_GET_RECORDS_LOADING, payload: true})

            const {data, status} = await httpRequest(
                `${API_RECORDS}`,
                "GET",
                null,
                {Authorization: `Bearer ${token}`}
            )

            if (status === 200) {
                dispatch({type: RECORDS_GET_RECORDS, payload: data.records})
                dispatch(setRecordsIsLoadedAction(true))
            } else {
                dispatch(addToastMessage({
                    message: 'Error', variant: 'error'
                }))
            }
        } catch (e) {
            dispatch(addToastMessage({
                message: 'Error', variant: 'error'
            }))
        } finally {
            dispatch({type: RECORDS_SET_GET_RECORDS_LOADING, payload: false})
        }
    }
}

export const addRecordsRecordAction = () => {
    return async (dispatch, getState) => {

        try {
            const {record} = getState().records
            const {token} = getState().auth

            if (record.length < 4 || record.length > 512) {
                return
            }
            dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: true})

            const {data, status} = await httpRequest(
                API_RECORDS,
                'POST',
                {content: record},
                {Authorization: `Bearer ${token}`}
            )

            if (status === 200) {
                dispatch({type: RECORDS_ADD_RECORD, payload: data.record})
                dispatch({type: RECORDS_ON_RECORD_CHANGED, payload: ''})
                dispatch(addToastMessage({
                    message: 'Added', variant: 'success'
                }))
            } else {
                dispatch(addToastMessage({
                    message: 'Error', variant: 'error'
                }))
            }
        } catch (e) {
            dispatch(addToastMessage({
                message: 'Error', variant: 'error'
            }))
        } finally {
            dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: false})
        }
    }
}

export const deleteRecordsRecordAction = record => {
    return async (dispatch, getState) => {

        try {
            const {token} = getState().auth
            dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: true})
            const {data, status} = await httpRequest(
                API_RECORDS,
                'DELETE',
                {recordId: record.id},
                {Authorization: `Bearer ${token}`}
            )

            if (status === 204) {
                dispatch({type: RECORDS_DELETE_RECORD, payload: record})
                dispatch(addToastMessage({
                    message: 'Deleted', variant: 'success'
                }))
            } else {
                dispatch(addToastMessage({
                    message: data.message, variant: 'error'
                }))
            }

        } catch (e) {
            dispatch(addToastMessage({
                message: 'Error', variant: 'error'
            }))
        } finally {
            dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: false})
        }
    }
}

export const editRecordsRecordAction = record => {
    return async (dispatch, getState) => {

        try {
            const {token} = getState().auth
            dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: true})
            const {data, status} = await httpRequest(
                API_RECORDS,
                'PUT',
                {recordId: record.id, content: record.content},
                {Authorization: `Bearer ${token}`}
            )

            if (status === 204) {
                dispatch({type: RECORDS_EDIT_RECORD, payload: record})
                dispatch(addToastMessage({
                    message: 'Edited', variant: 'success'
                }))
            } else {
                dispatch(addToastMessage({
                    message: data.message, variant: 'error'
                }))
            }

        } catch (e) {
            dispatch(addToastMessage({
                message: 'Error', variant: 'error'
            }))
        } finally {
            dispatch({type: RECORDS_SET_MANAGE_RECORD_LOADING, payload: false})
        }
        // dispatch({type: RECORDS_EDIT_RECORD, payload: record})
    }
}


