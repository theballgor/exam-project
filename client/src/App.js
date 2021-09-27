import useRoutes from "./navigation/Router"
import './resources/styles/index.scss'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthAction} from "./redux/auth/auth.actions";
import Toaster from "./components/Toaster/Toaster";

const App = () => {

    const {isReady} = useSelector(state => state.auth)
    const routes = useRoutes()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthAction())
    }, [])

  return (
    <>
        <Toaster/>
        {isReady && routes}
    </>
  )
}

export default App
