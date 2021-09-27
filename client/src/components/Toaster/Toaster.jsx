import React from 'react'
import styles from './Toaster.module.scss'
import ToastMessage from "../ToastMessage/ToastMessage";
import {useSelector} from "react-redux";

const Toaster = () => {

    const {toastMessages} = useSelector(state => state.application)

    return (
        <div className={styles.root}>
            {
                toastMessages.length > 0 && toastMessages.map((item, index) => (
                    <ToastMessage key={index} message={item.message} variant={item.variant} />
                ))
            }
        </div>
    )
}

export default Toaster