import React from 'react'
import styles from './Loader.module.scss'
import {CircularProgress} from "@material-ui/core";

const Loader = () => {
    return (<CircularProgress className={styles.loader} color={'primary'} />)
}

export default Loader