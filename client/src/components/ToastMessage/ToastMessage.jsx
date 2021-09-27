import React, {useEffect, useState} from 'react';
import styles from './ToastMessage.module.scss'

const ToastMessage = ({message, variant}) => {

    const [visible, setVisible] = useState(true)

    const onClose = () => {
        setVisible(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }, [])


    if(!visible) {
        return <></>
    }

    return (
        <div className={styles.root} onClick={onClose}>
            <div className={styles.message} data-variant={variant}>{message}</div>
        </div>
    )
}

export default ToastMessage