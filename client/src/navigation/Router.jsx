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
import ListPage from "../pages/ListPage/ListPage";

const useRoutes = () => {

    const {token, role} = useSelector(state => state.auth)
    const isAuthenticated = !!token

    if (isAuthenticated) {
        return (
            <BrowserRouter>
                <Navbar/>
                <Container maxWidth={'lg'}>
                    <Switch>
                        <Route path={Routes.Default} exact component={HomePage}/>
                        <Route path={Routes.Profile} exact component={ProfilePage}/>
                        <Route path={Routes.List} exact component={ListPage}/>
                        {
                            role === ADMIN &&
                                <>
                                    <Route path={Routes.Admin} exact component={AdminPanelPage}/>
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
