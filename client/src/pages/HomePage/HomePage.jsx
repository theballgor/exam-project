import React from 'react'
import styles from "./HomePage.module.scss"

const HomePage = () => {
    return (
        <div className={styles.root}>
            <div className={'pageTitle'}>
                Welcome to Library.IO
            </div>
        </div>
    )
}

export default HomePage