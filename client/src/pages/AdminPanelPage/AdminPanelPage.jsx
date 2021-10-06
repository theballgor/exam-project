import React from 'react'
import styles from "./AdminPanelPage.module.scss"
import UserTable from "../../components/UserTable/UserTable";

const AdminPanelPage = () => {


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