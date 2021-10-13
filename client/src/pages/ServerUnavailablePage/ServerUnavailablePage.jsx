import React from 'react'
import styles from './ServerUnavailablePage.module.scss'

const ServerUnavailablePage = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.text}>
                Something went wrong
            </p>
            <p className={styles.text}>
                Please try again later!
            </p>
        </div>
    )
}

export default ServerUnavailablePage