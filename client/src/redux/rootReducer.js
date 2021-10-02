import {combineReducers} from "redux"
import {authReducer} from "./auth/auth.reducer"
import {applicationReducer} from "./application/application.reducer";
import {profileReducer} from "./profile/profile.reducer";
import {recordsReducer} from "./records/records.reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    application: applicationReducer,
    profile: profileReducer,
    records: recordsReducer
})