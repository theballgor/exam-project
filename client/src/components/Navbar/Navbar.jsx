import React from 'react'
import styles from './Navbar.module.scss'
import {AppBar, Box, Button, Container, Toolbar} from "@material-ui/core";
import {NavLink, useHistory} from 'react-router-dom';
import Routes from "../../navigation/Routes";
import AuthModal from "../../modals/AuthModal/AuthModal";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthModalVisibleAction} from "../../redux/application/application.actions";
import {ADMIN} from "../../services/types/roles";
import {logoutAction} from "../../redux/auth/auth.actions";
import ProfileIcon from '../../resources/icons/account-white.svg'
import AdminPanelIcon from '../../resources/icons/admin-panel-white.svg'
import LogoutIcon from '../../resources/icons/logout-white.svg'
import ListIcon from '../../resources/icons/list-white.svg'


const Navbar = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const {token, role} = useSelector(state => state.auth)
    const isAuth = !!token

    const onProfileIconClick = () => {
        dispatch(setIsAuthModalVisibleAction(true))
    }

    const onLogoutIconClick = () => {
        dispatch(logoutAction())
    }

    const navigateToHome = () => {
        history.push(Routes.Default)
    }

    return (
        <>
            <AuthModal/>
            <Box sx={{flexGrow: 1}} className={styles.root}>
                <AppBar position="static">
                    <Container maxWidth={'lg'}>
                        <Toolbar className={styles.toolbar}>
                            <Button className={styles.logo} variant={'text'} onClick={navigateToHome}>
                                Records.io
                            </Button>
                            <div className={styles.navigation}>
                                {
                                    isAuth ?
                                        <>
                                            {
                                                role === ADMIN &&
                                                <NavLink to={Routes.Admin}>
                                                    <img
                                                        className={styles.icon}
                                                        src={AdminPanelIcon}
                                                        alt={'admin-panel'}
                                                    />
                                                </NavLink>
                                            }
                                            <NavLink to={Routes.Records}>
                                                <img
                                                    className={styles.icon}
                                                    src={ListIcon}
                                                    alt={'list'}
                                                />
                                            </NavLink>
                                            <NavLink to={Routes.Profile}>
                                                <img
                                                    className={styles.icon}
                                                    src={ProfileIcon}
                                                    alt={'profile'}
                                                />
                                            </NavLink>
                                            <img
                                                className={styles.icon}
                                                src={LogoutIcon}
                                                alt={'logout'}
                                                onClick={onLogoutIconClick}
                                            />
                                        </>
                                        :
                                        <>
                                            <img
                                                className={styles.icon}
                                                src={ProfileIcon}
                                                alt={'profile'}
                                                onClick={onProfileIconClick}
                                            />
                                        </>
                                }
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar