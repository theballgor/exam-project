import React, {useEffect} from 'react'
import styles from "./AdminPanelPage.module.scss"
import UserTable from "../../components/UserTable/UserTable";
import {useDispatch} from "react-redux";
import {adminGetUsersLoading} from "../../redux/admin/admin.actions";

const AdminPanelPage = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminGetUsersLoading(0, 5))
    }, [])

    return (
        <div className={styles.root}>
            <div className={'pageTitle'}>
                Admin panel
            </div>
            <div className={styles.usersTable}>
                <UserTable/>
            </div>
        </div>
    )
}

export default AdminPanelPage