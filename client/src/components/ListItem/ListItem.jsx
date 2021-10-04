import React from 'react'
import styles from './ListItem.module.scss'

const ListItem = ({label, onClick}) => {
    return (
        <div>
            {label}
        </div>
    );
};

export default ListItem;