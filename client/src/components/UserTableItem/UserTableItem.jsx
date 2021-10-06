import React from 'react'
import styles from './UserTableItem.module.scss'
import {TableCell, TableRow} from "@material-ui/core"

const UserTableItem = ({user}) => {

    return (
        <TableRow onClick={()=> console.log(user)} className={styles.root} key={user.id}>
            <TableCell align={'left'} component="th" scope="row">
                {user.id}
            </TableCell>
            <TableCell align={'left'} component="th" scope="row">
                {user.email}
            </TableCell>
            <TableCell align={'left'} >
                {user.username}
            </TableCell>
            <TableCell align={'left'} >
                {user.firstName}
            </TableCell>
            <TableCell align={'left'} >
                {user.lastName}
            </TableCell>
            <TableCell align={'left'}>
                {user.countOfRecords}
            </TableCell>
        </TableRow>
    )
}

export default UserTableItem