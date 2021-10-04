import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Routes from "./Routes";
import HomePage from "../pages/HomePage/HomePage";
import Navbar from "../components/Navbar/Navbar";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import {Container} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ADMIN} from "../services/types/roles";
import AdminPanelPage from "../pages/AdminPanelPage/AdminPanelPage";
import RecordsPage from "../pages/RecordsPage/RecordsPage";
import ServerUnavailablePage from "../pages/ServerUnavailablePage/ServerUnavailablePage";
import AdminUsersPage from "../pages/AdminUsersPage/AdminUsersPage";
import AdminRecordsPage from "../pages/AdminRecordsPage/AdminRecordsPage";

const useRoutes = () => {

    const {token, role} = useSelector(state => state.auth)
    const {isServerAvailable} = useSelector(state => state.application)
    const isAuthenticated = !!token

    if(!isServerAvailable) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={Routes.Default} exact component={ServerUnavailablePage}/>
                    <Redirect to={Routes.Default}/>
                </Switch>
            </BrowserRouter>
        )
    }

    if (isAuthenticated) {
        return (
            <BrowserRouter>
                <Navbar/>
                <Container maxWidth={'lg'}>
                    <Switch>
                        <Route path={Routes.Default} exact component={HomePage}/>
                        <Route path={Routes.Profile} exact component={ProfilePage}/>
                        <Route path={Routes.Records} exact component={RecordsPage}/>
                        {
                            role === ADMIN &&
                                <>
                                    <Route path={Routes.Admin} exact component={AdminPanelPage}/>
                                    <Route path={Routes.AdminUsers} exact component={AdminUsersPage}/>
                                    <Route path={Routes.AdminRecords} exact component={AdminRecordsPage}/>
                                </>
                        }
                        <Redirect to={Routes.Default}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <Container maxWidth={'lg'}>
                <Switch>
                    <Route path={Routes.Default} exact component={HomePage}/>
                    <Redirect to={Routes.Default}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default useRoutes
