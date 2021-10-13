import {httpRequest} from "../../services/utils/api/http.util";
import {API_ADMIN} from "../../services/utils/api/api.routes";
import {
    ADMIN_DELETE_USER,
    ADMIN_GET_USERS,
    ADMIN_GET_USERS_LOADING,
    ADMIN_SET_TOTAL_COUNT,
    RECORDS_DELETE_RECORD
} from "../action.types";
import {addToastMessage} from "../application/application.actions";

export const adminGetUsersLoading = (page, count) => {
    return async (dispatch, getState) => {
        try {
            const {token} = getState().auth
            dispatch({type: ADMIN_GET_USERS_LOADING, payload: true})
            const {data, status} = await httpRequest(
                API_ADMIN + `/users?page=${page}&count=${count}`,
                'GET',
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            if(status !== 200) {
                dispatch(addToastMessage({
                    message: 'Error', variant: 'error'
                }))
            } else {
                dispatch({type: ADMIN_GET_USERS, payload: data})
                dispatch({type: ADMIN_SET_TOTAL_COUNT, payload: data.totalCount})
            }
        } catch (e) {
            dispatch(addToastMessage({
                message: 'Error', variant: 'error'
            }))
        } finally {
            dispatch({type: ADMIN_GET_USERS_LOADING, payload: false})
        }
    }
}

export const adminDeleteUser = (user) => {
    return async (dispatch, getState) => {
        try {
            const {token} = getState().auth
            dispatch({type: ADMIN_GET_USERS_LOADING, payload: true})
            const {data, status} = await httpRequest(
                API_ADMIN + `/users`,
                'DELETE',
                {userId: user.id},
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if (status === 204) {
                dispatch({type: ADMIN_DELETE_USER, payload: user})
                dispatch({type: ADMIN_SET_TOTAL_COUNT, payload: getState().admin.totalCount - 1})

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
            dispatch({type: ADMIN_GET_USERS_LOADING, payload: false})
        }
    }
}