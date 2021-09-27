import React, {useState} from 'react'
import styles from './AuthModal.module.scss'
import {Box, Modal, TextField, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createAccountAction, loginAction} from "../../redux/auth/auth.actions";
import {setAuthStepAction, setIsAuthModalVisibleAction} from "../../redux/application/application.actions";
import {STEP_LOGIN, STEP_REGISTER} from "./types";
import PasswordVisible from '../../resources/icons/eye-black.svg'
import PasswordHidden from '../../resources/icons/eye-crossed-black.svg'

const AuthModal = () => {

    const dispatch = useDispatch()
    const {isAuthModalVisible, currentAuthStep} = useSelector(state => state.application)
    const {isLoading} = useSelector(state => state.auth)
    const [userInput, setUserInput] = useState({
        email: '', username: '', password: ''
    })
    const [userInputErrors, setUserInputErrors] = useState({
        email: '', username: '', password: ''
    })
    const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false)
    const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState(false)

    const toggleModal = () => {
        dispatch(setIsAuthModalVisibleAction(!isAuthModalVisible))
    }

    const onInputChange = event => {
        setUserInput({...userInput, [event.target.name]: event.target.value})
    }

    const validate = () => {
        const errorMessages = {
            email: '',
            username: '',
            password: ''
        }
        const emailValid = userInput.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const usernameValid = userInput.username.match(/^[A-Za-z][A-Za-z0-9_]{3,13}$/i);
        const passwordValid = userInput.password.length >= 8 && userInput.password.length <= 16
        errorMessages.email = emailValid ? '' : 'Not am email'
        errorMessages.username = usernameValid || currentAuthStep !== STEP_REGISTER ? '' : 'Username must contains only letters and numbers and has to be from 4 to 12 characters'
        errorMessages.password = passwordValid ? '' : 'Password has to be from 8 to 16 symbols'
        setUserInputErrors(errorMessages)
        if (currentAuthStep === STEP_LOGIN) {
            return emailValid && passwordValid
        }
        return emailValid && usernameValid && passwordValid
    }


    const onRegisterHandler = event => {
        event.preventDefault()
        if (validate()) {
            dispatch(createAccountAction(userInput))
        }
    }

    const navigateToLogin = () => {
        dispatch(setAuthStepAction(STEP_LOGIN))
    }

    const toggleIsRegisterPasswordVisible = () => {
        setIsRegisterPasswordVisible(!isRegisterPasswordVisible)
    }

    const registerContent = (
        <>
            <div className={styles.titleContainer}>
                <span className={styles.title}>Register</span>
            </div>
            <form>
                <div className={styles.formWrapper}>
                    <div className={styles.inputContainer}>
                        <TextField
                            variant={'standard'}
                            name={'username'}
                            label={'Username'}
                            type={'text'}
                            required
                            onChange={onInputChange}
                            className={styles.input}
                            value={userInput.username}
                            error={!!userInputErrors.username}
                            helperText={userInputErrors.username}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <TextField
                            variant={'standard'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                            required
                            onChange={onInputChange}
                            className={styles.input}
                            value={userInput.email}
                            error={!!userInputErrors.email}
                            helperText={userInputErrors.email}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <TextField
                            variant={'standard'}
                            name={'password'}
                            label={'Password'}
                            type={isRegisterPasswordVisible ? 'text' : 'password'}
                            required
                            onChange={onInputChange}
                            className={styles.input}
                            value={userInput.password}
                            error={!!userInputErrors.password}
                            helperText={userInputErrors.password}
                            InputProps={{
                                endAdornment: (isRegisterPasswordVisible ?
                                        <>
                                            <img
                                                className={styles.passwordIcon}
                                                src={PasswordHidden}
                                                alt={'hide password'}
                                                onClick={toggleIsRegisterPasswordVisible}
                                            />
                                        </>
                                        :
                                        <>
                                            <img
                                                className={styles.passwordIcon}
                                                src={PasswordVisible}
                                                alt={'show password'}
                                                onClick={toggleIsRegisterPasswordVisible}
                                            />
                                        </>

                                )
                            }}
                        />
                    </div>
                    <div className={styles.buttonRow}>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            onClick={onRegisterHandler}
                            disabled={isLoading}
                        >
                            Register
                        </Button>
                        <span
                            className={styles.link}
                            onClick={navigateToLogin}
                        >
                            Have an account? Sign in!
                        </span>
                    </div>
                </div>
            </form>
        </>
    )


    const onLoginHandler = event => {
        event.preventDefault()
        if (validate()) {
            dispatch(loginAction(userInput))
        }
    }

    const toggleIsLoginPasswordVisible = () => {
        setIsLoginPasswordVisible(!isLoginPasswordVisible)
    }

    const navigateToRegister = () => {
        dispatch(setAuthStepAction(STEP_REGISTER))
    }

    const loginContent = (
        <>
            <div className={styles.titleContainer}>
                <span className={styles.title}>Login</span>
            </div>
            <form>
                <div className={styles.formWrapper}>
                    <div className={styles.inputContainer}>
                        <TextField
                            variant={'standard'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                            required
                            onChange={onInputChange}
                            className={styles.input}
                            value={userInput.email}
                            error={!!userInputErrors.email}
                            helperText={userInputErrors.email}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <TextField
                            variant={'standard'}
                            name={'password'}
                            label={'Password'}
                            type={isLoginPasswordVisible ? 'text' : 'password'}
                            required
                            onChange={onInputChange}
                            className={styles.input}
                            value={userInput.password}
                            error={!!userInputErrors.password}
                            helperText={userInputErrors.password}
                            InputProps={{
                                endAdornment: (isLoginPasswordVisible ?
                                        <>
                                            <img
                                                className={styles.passwordIcon}
                                                src={PasswordHidden}
                                                alt={'hide password'}
                                                onClick={toggleIsLoginPasswordVisible}
                                            />
                                        </>
                                        :
                                        <>
                                            <img
                                                className={styles.passwordIcon}
                                                src={PasswordVisible}
                                                alt={'show password'}
                                                onClick={toggleIsLoginPasswordVisible}
                                            />
                                        </>

                                )
                            }}
                        />
                    </div>
                    <div className={styles.buttonRow}>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            onClick={onLoginHandler}
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                        <span
                            className={styles.link}
                            onClick={navigateToRegister}
                        >
                            Don't have an account? Create one!
                        </span>
                    </div>
                </div>
            </form>
        </>
    )

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isAuthModalVisible}
            onClose={toggleModal}
            closeAfterTransition
        >
            <Box className={styles.paper}>
                {currentAuthStep === STEP_LOGIN ? loginContent : registerContent}
            </Box>
        </Modal>
    )
}

export default AuthModal