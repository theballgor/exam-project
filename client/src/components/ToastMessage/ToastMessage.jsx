import React, {useEffect, useState} from 'react'
import styles from './ToastMessage.module.scss'
import CloseIcon from '../../resources/icons/close-white.svg'


const ToastMessage = ({message, variant}) => {

    const [visible, setVisible] = useState(true)
    const [startHiding, setStartHiding] = useState(false)

    const onClose = () => {
        setStartHiding(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setStartHiding(true)
        }, 4000)
        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }, [])


    if(!visible) {
        return <></>
    }

    return (
        <div className={styles.root} data-animationstart={startHiding} onClick={onClose}>
            <div className={styles.message} data-variant={variant}>
                <span>
                    {message}
                </span>
                <img className={styles.icon} src={CloseIcon} alt={'close'}/>
            </div>
        </div>
    )
}

export default ToastMessage