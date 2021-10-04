import React, {useState} from 'react'
import styles from "./AdminPanelPage.module.scss"
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import AdminUsersPage from "../AdminUsersPage/AdminUsersPage";
import AdminUsersTable from "../../components/AdminUsersTable/AdminUsersTable";

const AdminPanelPage = () => {

    const [currentSection, setCurrentSection] = useState('users')


    const onCurrentSectionChange = (event) => {
        console.log(event.target.value)
        setCurrentSection(event.target.value)
    }

    return (
        <div className={styles.root}>
            <div className={'pageTitle'}>
                Admin panel
            </div>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="manage-section"
                    defaultValue="users"
                    name="radio-buttons-group"
                >
                    <div className={styles.sectionTitle}>Manage</div>
                    <div className={styles.controlRow}>
                        <FormControlLabel value="users" control={<Radio onChange={onCurrentSectionChange} color="primary"/>} label="Users"/>
                        <FormControlLabel value="records" control={<Radio onChange={onCurrentSectionChange} color="primary"/>} label="Records"/>
                    </div>
                </RadioGroup>
            </FormControl>
            <div>
                {
                    currentSection === 'users' ? <AdminUsersTable/> : <span>Records</span>
                }
            </div>
        </div>
    )
}

export default AdminPanelPage