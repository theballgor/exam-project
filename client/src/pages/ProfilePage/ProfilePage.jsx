import React, {useEffect} from 'react'
import styles from './ProfilePage.module.scss'
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {loadProfileDataActions, onProfileChangedAction, onProfileSaveAction} from "../../redux/profile/profile.actions";
import Loader from "../../components/Loader/Loader";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const {
        firstName,
        lastName,
        additionalInfo,
        firstNameError,
        lastNameError,
        additionalInfoError,
        wasChanged,
        isLoading
    } = useSelector(state => state.profile)
    const {email, username} = useSelector(state => state.auth)

    useEffect(() => {
        if(firstName && lastName && additionalInfo) {
            return
        }
        dispatch(loadProfileDataActions())
    }, [])

    const onSaveProfileHandler = event => {
        event.preventDefault()
        dispatch(onProfileSaveAction())
    }

    const onInputChange = event => {
        dispatch(onProfileChangedAction(event.target.name, event.target.value))
    }

    return (
        <div className={styles.root}>
            <div className={'pageTitle'}>
                Personal profile
            </div>
            {
                isLoading
                    ?
                    <div className={'loader'}>
                        <Loader/>
                    </div>
                    :
                    <form className={styles.form}>
                        <div className={styles.formContainer}>
                            <div className={styles.formItem}>
                                <TextField
                                    variant={'outlined'}
                                    name={'username'}
                                    label={'Username'}
                                    type={'text'}
                                    onChange={onInputChange}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={styles.input}
                                    value={username}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <TextField
                                    variant={'outlined'}
                                    name={'email'}
                                    label={'Email'}
                                    type={'email'}
                                    onChange={onInputChange}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={styles.input}
                                    value={email}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <TextField
                                    variant={'outlined'}
                                    name={'firstName'}
                                    label={'First name'}
                                    type={'text'}
                                    onChange={onInputChange}
                                    className={styles.input}
                                    value={firstName}
                                    error={!!firstNameError}
                                    helperText={firstNameError}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <TextField
                                    variant={'outlined'}
                                    name={'lastName'}
                                    label={'Last name'}
                                    type={'text'}
                                    onChange={onInputChange}
                                    className={styles.input}
                                    value={lastName}
                                    error={!!lastNameError}
                                    helperText={lastNameError}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <TextField
                                    variant={'outlined'}
                                    name={'additionalInfo'}
                                    label={'Additional info'}
                                    type={'text'}
                                    multiline
                                    rows={'3'}
                                    onChange={onInputChange}
                                    className={styles.input}
                                    value={additionalInfo}
                                    error={!!additionalInfoError}
                                    helperText={additionalInfoError}
                                />
                            </div>
                            <div className={styles.buttonRow}>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={onSaveProfileHandler}
                                    disabled={!wasChanged}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
            }
        </div>
    )
}

export default ProfilePage